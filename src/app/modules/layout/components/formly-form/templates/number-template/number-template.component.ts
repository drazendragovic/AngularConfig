/* eslint-disable @angular-eslint/no-forward-ref */
/* eslint-disable @angular-eslint/component-max-inline-declarations */
import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-integer-template',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <s-integer
    ngDefaultControl
    [formControl]="formControl"
    [formlyAttributes]="field"
    [label]="to?.label"
    [actions]="to?.['actions']"
    [hidden]="to?.hidden"
    [minFractionDigits]="to?.['minFractionDigits']"
    [maxFractionDigits]="to?.['maxFractionDigits']"
    [min]="to?.min"
    [max]="to?.max"
    [useGrouping]="to?.['useGrouping']"
  ></s-integer>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberTemplateComponent),
      multi: true,
    },
  ],
})
export class NumberTemplateComponent extends FieldType<FieldTypeConfig> {}
