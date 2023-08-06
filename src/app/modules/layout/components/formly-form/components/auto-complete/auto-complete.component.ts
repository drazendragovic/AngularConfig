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
import { Subject } from 'rxjs';
import { APP_CONFIG } from 'src/app/core/configuration/config.constants';
import { UIConfig } from 'src/app/core/models/uiConfig';
import { LookupDataSource } from 'src/app/core';

@Component({
  selector: 's-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutoCompleteComponent),
      multi: true,
    },
  ],
})
export class AutoCompleteComponent extends ValueAccessorBase implements OnInit, AfterViewInit, OnDestroy {
  @Input() dataSource!: LookupDataSource;
  @Input() minLength;
  @Input() dropdownColumns?: DropdownColumn[];
  @Input() emptyMessage = '';

  @ViewChild(AutoComplete) autoComplete!: AutoComplete;

  private lastObjectValue: any;
  private destroy$ = new Subject<void>();

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

    this.destroy$.next();
    this.destroy$.complete();
  }

  search($event: any): void {
    this.dataSource.search($event.query);
  }

  override writeValue(value: any): void {
    const controlValue = this.safeGetValue(this.lastObjectValue);
    value = this.safeGetValue(value);

    if (value && value !== controlValue) {
      this.dataSource
        .loadIds(value)
        .pipe(take(1))
        .subscribe((data) => {
          this.lastObjectValue = data[0];
          this.autoComplete?.writeValue(this.lastObjectValue);
          super.writeValue(value);
        });
    } else if (!value) {
      this.lastObjectValue = undefined;
      this.autoComplete?.writeValue(undefined);
      super.writeValue(undefined);
    }
  }

  override onChanged($event: any) {
    // Fix for two way binding usage scenario
    if (this.isString($event)) {
      this.autoComplete?.writeValue(this.lastObjectValue);
    }
    const value = this.safeGetValue($event);
    super.onChanged(value);
  }

  dropdownClass(col: DropdownColumn): string {
    if (!col.size) return 'col';
    return `col-${col.size}`;
  }

  private isString(objectOrValue: any): boolean {
    return objectOrValue && typeof objectOrValue === 'string';
  }

  private safeGetValue(objectOrValue: any): string | undefined {
    if (!objectOrValue) return undefined;

    return this.isString(objectOrValue) ? objectOrValue : objectOrValue[this.dataSource.valueField];
  }
}
