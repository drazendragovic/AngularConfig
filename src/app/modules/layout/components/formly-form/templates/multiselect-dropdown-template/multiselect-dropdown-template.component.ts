/* eslint-disable @angular-eslint/no-forward-ref */
/* eslint-disable @angular-eslint/component-max-inline-declarations */
import { ChangeDetectionStrategy, Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { initializeDataSource } from '../../api';

@Component({
  selector: 'multiselect-dropdown-template',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <s-multiselect-dropdown
    ngDefaultControl
    [formControl]="formControl"
    [formlyAttributes]="field"
    [label]="to?.label"
    [hidden]="to?.hidden"
    [actions]="to?.['actions']"
    [dataSource]="props['dataSource']"
    [dropdownColumns]="to?.['dropdownColumns']"
  ></s-multiselect-dropdown>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiselectDropdownTemplateComponent),
      multi: true,
    },
  ],
})
export class MultiselectDropdownTemplateComponent extends FieldType<FieldTypeConfig> implements OnInit {
  ngOnInit(): void {
    initializeDataSource(this);
  }
}
