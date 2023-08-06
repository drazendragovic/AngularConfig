/* eslint-disable @angular-eslint/no-forward-ref */
/* eslint-disable @angular-eslint/component-max-inline-declarations */
import { Component, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'short-string-template',
  template: ` <s-short-string
    ngDefaultControl
    [formControl]="formControl"
    [formlyAttributes]="field"
    [label]="props?.label"
    [hidden]="props?.hidden"
    [actions]="props?.['actions']"
    [type]="props?.type ?? 'text'"
    [maxLen]="props?.['maxLen']"
  ></s-short-string>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ShortStringTemplateComponent),
      multi: true,
    },
  ],
})
export class ShortStringTemplateComponent extends FieldType<FieldTypeConfig> {}
