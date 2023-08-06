/* eslint-disable @angular-eslint/no-forward-ref */
/* eslint-disable @angular-eslint/component-max-inline-declarations */
import { ChangeDetectionStrategy, Component, forwardRef, Inject, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UIConfig } from 'src/app/core';
import { APP_CONFIG } from 'src/app/core/configuration/config.constants';
import { initializeDataSource } from '../../api';

@Component({
  selector: 'dropdown-template',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <s-auto-complete
    ngDefaultControl
    [formControl]="formControl"
    [formlyAttributes]="field"
    [label]="props?.label"
    [hidden]="props?.hidden"
    [dataSource]="props['dataSource']"
    [actions]="props['actions']"
    [dropdownColumns]="props['dropdownColumns']"
    [minLength]="props?.minLength ?? defaultMinLength"
  ></s-auto-complete>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutoCompleteTemplateComponent),
      multi: true,
    },
  ],
})
export class AutoCompleteTemplateComponent extends FieldType<FieldTypeConfig> implements OnInit {
  defaultMinLength = 0;

  constructor(@Inject(APP_CONFIG) private config: UIConfig) {
    super();
    this.defaultMinLength = config.autoComplete.minSearchLength;
  }

  ngOnInit(): void {
    this.props['dataSource'] = initializeDataSource(this);
  }
}
