/* eslint-disable @angular-eslint/no-forward-ref */
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessorBase } from '../value-accessor-base';
import { AutoComplete } from 'primeng/autocomplete';
import { DropdownColumn } from '../dropdown-column';
import { take } from 'rxjs/operators';
import { LookupDataSource, UIConfig } from 'src/app/core';
import { APP_CONFIG } from 'src/app/core/configuration/config.constants';
import { UtilsService } from 'src/app/core/utils/utils.service';

@Component({
  selector: 's-multiselect-auto-complete',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './multiselect-auto-complete.component.html',
  styleUrls: ['./multiselect-auto-complete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiselectAutoCompleteComponent),
      multi: true,
    },
  ],
})
export class MultiselectAutoCompleteComponent extends ValueAccessorBase implements OnInit, AfterViewInit, OnDestroy {
  @Input() dataSource!: LookupDataSource;
  @Input() minLength;
  @Input() dropdownColumns?: DropdownColumn[];
  @Input() emptyMessage = '';

  @ViewChild(AutoComplete) autoComplete!: AutoComplete;

  private lastObjectValue: any[] = [];

  constructor(private cdRef: ChangeDetectorRef, @Inject(APP_CONFIG) private config: UIConfig) {
    super(config);
    this.minLength = config.autoComplete.minSearchLength;
    this.emptyMessage = config.autoComplete.emptyMessage;
  }

  ngOnInit(): void {
    this.dropdownColumns = this.dropdownColumns ?? [];
    this.dropdownColumns = [{ field: this.dataSource.displayField }, ...this.dropdownColumns];
  }

  ngAfterViewInit(): void {
    if (this.autoComplete.value !== this.lastObjectValue) {
      this.autoComplete.writeValue(this.lastObjectValue);
      this.cdRef.detectChanges();
    }
  }

  ngOnDestroy(): void {
    this.dataSource?.destroy();
  }

  search($event: any): void {
    this.dataSource.search($event.query);
  }

  override writeValue(value: any): void {
    if (!value) value = [];
    const controlValue = this.lastObjectValue ? this.lastObjectValue.map((x) => x[this.dataSource.valueField]) : [];
    if (value.length > 0 && !UtilsService.deepEqual(value, controlValue)) {
      this.dataSource
        .loadIds(...value)
        .pipe(take(1))
        .subscribe((data) => {
          this.lastObjectValue = data;
          this.autoComplete?.writeValue(this.lastObjectValue);
          super.writeValue(value);
        });
    } else if (value.length === 0) {
      this.lastObjectValue = value;
      this.autoComplete?.writeValue(value);
      super.writeValue(value);
    }
  }

  override onChanged($event: any[]) {
    if (this.isStringArray($event)) {
      this.autoComplete?.writeValue(this.lastObjectValue);
    }
    const value = this.safeGetValue($event);
    super.onChanged(value);
  }

  dropdownClass(col: DropdownColumn): string {
    if (!col.size) return 'col';
    return `col-${col.size}`;
  }

  private safeGetValue(objectOrValue: any): string[] {
    if (!objectOrValue) return [];

    return this.isStringArray(objectOrValue) ? objectOrValue : objectOrValue.map((x: any) => x[this.dataSource.valueField]);
  }

  private isStringArray(objectOrValue: any): boolean {
    return objectOrValue && objectOrValue.length && typeof objectOrValue[0] === 'string';
  }
}
