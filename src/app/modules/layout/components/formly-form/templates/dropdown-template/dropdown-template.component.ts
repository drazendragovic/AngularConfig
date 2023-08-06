/* eslint-disable @angular-eslint/no-forward-ref */
/* eslint-disable @angular-eslint/component-max-inline-declarations */
import { ChangeDetectionStrategy, Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { initializeDataSource } from '../../api';

@Component({
  selector: 'dropdown-template',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <s-dropdown
    ngDefaultControl
    [formControl]="formControl"
    [formlyAttributes]="field"
    [label]="props?.label"
    [hidden]="props?.hidden"
    [dataSource]="props['dataSource']"
    [actions]="props['actions']"
    [isRequired]="props.required !== undefined ? props.required : false"
    [hideClear]="props['hideClear'] !== undefined ? props['hideClear'] : false"
    [dropdownColumns]="props['dropdownColumns']"
    [panelStyleClass]="props['panelStyleClass']"
    [isFiltered]="props['filter'] !== undefined ? props['filter'] : false"
  ></s-dropdown>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownTemplateComponent),
      multi: true,
    },
  ],
})
export class DropdownTemplateComponent extends FieldType<FieldTypeConfig> implements OnInit {
  ngOnInit(): void {
    this.props['dataSource'] = initializeDataSource(this);
  }
}
