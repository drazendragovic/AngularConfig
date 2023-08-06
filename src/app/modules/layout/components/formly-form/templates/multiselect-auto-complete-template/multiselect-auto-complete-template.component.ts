/* eslint-disable @angular-eslint/no-forward-ref */
/* eslint-disable @angular-eslint/component-max-inline-declarations */
import { ChangeDetectionStrategy, Component, forwardRef, Inject, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { UIConfig } from 'src/app/core';
import { APP_CONFIG } from 'src/app/core/configuration/config.constants';
import { initializeDataSource } from '../../api';

@Component({
  selector: 'app-multiselect-auto-complete-template',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <s-multiselect-auto-complete
    ngDefaultControl
    [formControl]="formControl"
    [formlyAttributes]="field"
    [label]="to?.label"
    [hidden]="to?.hidden"
    [dataSource]="to?.['dataSource']"
    [actions]="to?.['actions']"
    [dropdownColumns]="to?.['dropdownColumns']"
    [minLength]="to?.minLength ?? defaultMinLength"
  ></s-multiselect-auto-complete>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiselectAutoCompleteTemplateComponent),
      multi: true,
    },
  ],
})
export class MultiselectAutoCompleteTemplateComponent extends FieldType<FieldTypeConfig> implements OnInit {
  defaultMinLength = 0;

  constructor(@Inject(APP_CONFIG) private config: UIConfig) {
    super();
    this.defaultMinLength = config.autoComplete.minSearchLength;
  }

  ngOnInit(): void {
    initializeDataSource(this);
  }
}
