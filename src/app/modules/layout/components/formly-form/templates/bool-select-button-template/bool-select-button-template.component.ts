/* eslint-disable @angular-eslint/no-forward-ref */
/* eslint-disable @angular-eslint/component-max-inline-declarations */
import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'bool-select-button-template',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <s-bool-select-button
    ngDefaultControl
    [formControl]="formControl"
    [formlyAttributes]="field"
    [hidden]="to?.hidden"
    [trueLabel]="props['trueLabel']"
    [falseLabel]="props['falseLabel']"
  ></s-bool-select-button>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BoolSelectButtonTemplateComponent),
      multi: true,
    },
  ],
})
export class BoolSelectButtonTemplateComponent extends FieldType<FieldTypeConfig> {}
