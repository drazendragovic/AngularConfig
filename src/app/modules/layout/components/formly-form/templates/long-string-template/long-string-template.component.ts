/* eslint-disable @angular-eslint/no-forward-ref */
/* eslint-disable @angular-eslint/component-max-inline-declarations */
import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'long-string-template',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <s-long-string
    ngDefaultControl
    [formControl]="formControl"
    [formlyAttributes]="field"
    [label]="to?.label"
    [hidden]="to?.hidden"
    [actions]="to?.['actions']"
    [maxLen]="to?.['maxLen']"
    [autoResize]="to?.['autoResize'] !== undefined ? to?.['autoResize'] : true"
    [rws]="to?.['rws']"
  ></s-long-string>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LongStringTemplateComponent),
      multi: true,
    },
  ],
})
export class LongStringTemplateComponent extends FieldType<FieldTypeConfig> {}
