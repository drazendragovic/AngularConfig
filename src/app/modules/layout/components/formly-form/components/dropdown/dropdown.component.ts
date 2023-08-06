/* eslint-disable @angular-eslint/no-forward-ref */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessorBase } from '../value-accessor-base';
import { DropdownColumn } from '../dropdown-column';
import { LookupDataSource, UIConfig } from 'src/app/core';
import { APP_CONFIG } from 'src/app/core/configuration/config.constants';

@Component({
  selector: 's-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent extends ValueAccessorBase implements OnInit, OnDestroy {
  @Input() dataSource!: LookupDataSource;
  @Input() isRequired = false;
  @Input() dropdownColumns?: DropdownColumn[];
  @Input() hideClear = false;
  @Input() emptyFilterMessage;
  @Input() panelStyleClass: string;
  @Input() isFiltered = false;
  @ViewChild('dropdown') dropdown: ElementRef;
  initialDataSource: any;
  loadOnInitialClick = true;
  virtualScroll = false;

  constructor(@Inject(APP_CONFIG) private config: UIConfig, private cdRef: ChangeDetectorRef) {
    super(config);
    this.emptyFilterMessage = config.autoComplete?.emptyMessage;
  }

  ngOnInit(): void {
    this.dropdownColumns = this.dropdownColumns ?? [];
    this.dropdownColumns = [{ field: this.dataSource.displayField }, ...this.dropdownColumns];

    this.dataSource.data$.subscribe((x: any[]) => {
      if (x.length > 50 && !this.virtualScroll) {
        this.virtualScroll = true;
      } else {
        this.virtualScroll = false;
      }
      if (!this.initialDataSource) return;
      const existItemInList = x.filter((item) => item[this.dataSource.valueField] == this.initialDataSource.ID);
      if (existItemInList.length == 0 && this.initialDataSource) {
        x.push(this.initialDataSource);
      }
    });
  }

  ngOnDestroy(): void {
    this.dataSource?.destroy();
  }

  dropdownClass(col: DropdownColumn): string {
    let itemWidth = document.getElementById('dropdown-column-item') ? document.getElementById('dropdown-column-item')?.offsetWidth : 0;
    if (this.panelStyleClass === undefined && this.virtualScroll) {
      this.panelStyleClass = 'dropdown-big-data';
    } else if ((itemWidth ?? 0 > this.dropdown.nativeElement.offsetWidth) && this.panelStyleClass === undefined) {
      this.panelStyleClass = 'dropdown-word-break';
      this.cdRef.detectChanges();
    }
    if (!col.size) return 'col';
    return `col-${col.size}`;
  }

  override writeValue(value: any): void {
    if (!value) return;

    const existItemInList = this.dataSource.currentData().filter((item) => item[this.dataSource.valueField] == value);
    if (existItemInList.length == 0) {
      this.dataSource.loadIds(value).subscribe((data) => {
        this.initialDataSource = data[0];
        super.writeValue(value);
      });
    }
  }

  onClick() {
    if (this.loadOnInitialClick) {
      this.loadOnInitialClick = false;
      this.dataSource.load();
    }
  }
}
