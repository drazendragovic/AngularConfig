/* eslint-disable @angular-eslint/no-forward-ref */
import { ChangeDetectionStrategy, Component, forwardRef, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessorBase } from '../value-accessor-base';
import { DropdownColumn } from '../dropdown-column';
import { LookupDataSource, UIConfig } from 'src/app/core';
import { APP_CONFIG } from 'src/app/core/configuration/config.constants';

@Component({
  selector: 's-multiselect-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './multiselect-dropdown.component.html',
  styleUrls: ['./multiselect-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiselectDropdownComponent),
      multi: true,
    },
  ],
})
export class MultiselectDropdownComponent extends ValueAccessorBase implements OnInit, OnDestroy {
  @Input() dataSource!: LookupDataSource;
  @Input() dropdownColumns?: DropdownColumn[];
  initialDataSource: any[] = [];
  loadOnInitialClick = true;

  constructor(@Inject(APP_CONFIG) private config: UIConfig) {
    super(config);
  }

  ngOnInit(): void {
    this.dropdownColumns = this.dropdownColumns ?? [];
    this.dropdownColumns = [{ field: this.dataSource.displayField }, ...this.dropdownColumns];

    this.dataSource.data$.subscribe((x: any[]) => {
      if (this.initialDataSource.length == 0) return;
      for (let i = 0; i < this.initialDataSource.length; i++) {
        const existItemInList = x.filter((item) => item[this.dataSource.valueField] == this.initialDataSource[i].ID);
        if (existItemInList.length == 0 && this.initialDataSource[i]) {
          x.push(this.initialDataSource[i]);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.dataSource?.destroy();
  }

  dropdownClass(col: DropdownColumn): string {
    if (!col.size) return 'col';
    return `col-${col.size}`;
  }

  override writeValue(value: string[]): void {
    const valuesToCatchIDs: string[] = [];
    if (!value || value.length == 0) return;

    for (let i = 0; i < value.length; i++) {
      const existItemInList = this.dataSource.currentData().filter((item) => item[this.dataSource.valueField] == value[i]);
      if (existItemInList.length == 0) valuesToCatchIDs.push(value[i]);
    }

    if (valuesToCatchIDs.length > 0) {
      this.dataSource.loadIds(...valuesToCatchIDs).subscribe((data) => {
        this.initialDataSource = data;
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
