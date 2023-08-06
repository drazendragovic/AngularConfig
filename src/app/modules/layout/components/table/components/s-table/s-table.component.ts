/* eslint-disable @typescript-eslint/naming-convention */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { TableConfigurationParams } from '../../interfaces/tableConfigurationParams';
import { Table } from 'primeng/table';
import { PrimeTemplate } from 'primeng/api';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { ButtonStyle, ButtonType, UIConfig, UiAction, getButtonStyleClass, getButtonTypeClass } from 'src/app/core';
import { APP_CONFIG } from 'src/app/core/configuration/config.constants';
import { TableSelectionType } from '../../interfaces/tableSelectionType';
import { UtilsService } from 'src/app/core/utils/utils.service';
import { ChangeMessageService } from '../../../shared/services/change-message-service';

@Component({
  selector: 's-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './s-table.component.html',
  styleUrls: ['./s-table.component.scss'],
})
export class STableComponent implements OnInit, OnDestroy {
  @Input() configuration!: TableConfigurationParams<any>;
  @Input() scrollHeight = '';
  @Output() readonly selectionChanged = new EventEmitter<any>();
  @Output() readonly rowClick = new EventEmitter<{ $event: MouseEvent; row: any }>();
  @ViewChild(Table) table!: Table;
  @ContentChild('summary') summary?: TemplateRef<any>;
  @ContentChildren(PrimeTemplate) templates!: QueryList<PrimeTemplate>;
  @Input() checkBoxSelection = false;
  @Input() selectionMode: 'single' | 'multiple' | '' = '';

  data$!: Observable<any>;
  loading$!: Observable<any>;
  total$: Observable<any> = of(0);
  selection: any;
  total!: number;
  skip = 0;
  take = 0;
  rowActionWidthLeft = 0;
  rowActionWidthRight = 0;
  rowActionsLeft: UiAction[] = [];
  rowActionsRight: UiAction[] = [];
  sortField = '';
  sortOrder: 1 | -1 = 1;
  scrollable = true;
  resizableColumns = true;
  autoLayout = false;

  private persistState = false;
  private destroy$$ = new Subject<void>();

  constructor(
    public cdRef: ChangeDetectorRef,
    @Optional() private changeMessageService: ChangeMessageService,
    @Inject(APP_CONFIG) private UiConfig: UIConfig
  ) {}

  ngOnInit() {
    this.checkBoxSelection = this.configuration.checkBoxSelection ?? false;
    this.scrollable = this.configuration.tableOptions?.scrollable ?? this.UiConfig.tableOptions?.scrollable ?? false;
    this.resizableColumns = this.configuration.tableOptions?.resizableColumns ?? this.UiConfig.tableOptions?.resizableColumns ?? false;
    this.autoLayout = this.configuration.tableOptions?.autoLayout ?? this.UiConfig.tableOptions?.autoLayout ?? true;
    this.take = this.configuration.paginatorOptions ? this.configuration.paginatorOptions.defaultRows : 10;
    if (this.configuration.rowActions) {
      this.rowActionsLeft = this.configuration.rowActions.filter((x) => x.position === 'left');
      this.rowActionsRight = this.configuration.rowActions.filter((x) => x.position === 'right');
      this.rowActionWidthLeft = this.getRowActionWidth(this.rowActionsLeft.length);
      this.rowActionWidthRight = this.getRowActionWidth(this.rowActionsRight.length);
    }
    this.loading$ = this.configuration.dataSource?.loading$ as Observable<any>;
    this.data$ = this.configuration.dataSource?.data$ as Observable<any>;
    this.total$ = this.configuration.dataSource?.total$ as Observable<any>;
    /*this.configuration.dataSource?.total$.pipe(takeUntil(this.destroy$$)).subscribe((value) => {
      this.total = value as number;
      this.cdRef.detectChanges();
    });*/
    const initSort = this.configuration.dataSource?.getSort();
    if (initSort && initSort.length === 1) {
      this.sortField = initSort[0].field as string;
      this.sortOrder = this.getOrderAsNumber(initSort[0].sortDirection);
    }
    this.applySelectionType(this.configuration.selectionType);
  }

  onLazyLoad($event: any): void {
    this.skip = $event.first;
    this.take = $event.rows;

    if ($event.sortField) {
      this.configuration.dataSource?.sort($event.sortField, this.getOrderAsString($event.sortOrder));
    }

    this.loadCurrentPage();
  }

  public gotoFirstPage(): void {
    this.skip = 0;
    this.loadCurrentPage();
  }

  public loadCurrentPage(): void {
    this.configuration.dataSource?.query(this.skip, this.take);
  }

  onSelectionChanged(): void {
    if (this.selection && UtilsService.isArray(this.selection)) {
      this.selection = this.selection.filter((x: any) => x !== undefined);
    }
    this.selectionChanged.emit(this.selection);
    if (this.changeMessageService) {
      this.changeMessageService.tableSelectionChanged.next(this.selection);
    }
  }

  markStateForPersisting() {
    this.persistState = true;
  }

  getTemplate(templateName: string): TemplateRef<any> {
    const t = this.templates.toArray().find((x) => x.name.toLowerCase() == templateName?.toLowerCase());
    if (!t) {
      throw new Error(`Template with name ${templateName} does not exist.`);
    }
    return t.template;
  }

  hasTemplate(templateName: string): boolean {
    return this.templates.toArray().find((x) => x.name.toLowerCase() == templateName.toLowerCase()) !== undefined;
  }

  getButtonClass(action: UiAction): string {
    return `grid-button ${getButtonStyleClass(
      action.style ?? (this.UiConfig.defaultTableActionButtonStyle as ButtonStyle)
    )} ${getButtonTypeClass(action.type ?? (this.UiConfig.defaultTableActionButtonType as ButtonType))}`;
  }

  getRowActionWidth(length: number): number {
    return (this.configuration.rowActionWidth ? this.configuration.rowActionWidth : 4) * length;
  }

  isSelected(): boolean {
    if (UtilsService.isArray(this.selection)) return this.selection.length;

    return !!this.selection;
  }

  changeSelectionType(selectionType: TableSelectionType): void {
    this.configuration.selectionType = selectionType;
    this.applySelectionType(selectionType);
    this.cdRef.detectChanges();
  }

  onRowClick($event: MouseEvent, rowData: any): void {
    this.rowClick.emit({ $event, row: rowData });
  }

  private applySelectionType(selectionType: TableSelectionType): void {
    switch (selectionType) {
      case 'single':
        this.selectionMode = 'single';
        this.checkBoxSelection = false;
        this.selection = undefined;
        break;
      case 'checkbox':
        this.selectionMode = 'multiple';
        this.checkBoxSelection = true;
        this.selection = [];
        break;
      case 'none':
        this.selectionMode = '';
        this.checkBoxSelection = false;
        this.selection = undefined;
        break;
    }
  }

  private getOrderAsString(stringOrder: 1 | -1) {
    return stringOrder === 1 ? 'asc' : 'desc';
  }

  private getOrderAsNumber(stringOrder: 'asc' | 'desc') {
    return stringOrder === 'asc' ? 1 : -1;
  }

  ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }
}
