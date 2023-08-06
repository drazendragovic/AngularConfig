/* eslint-disable @angular-eslint/no-forward-ref */
/* eslint-disable @angular-eslint/component-max-inline-declarations */
import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'bool-switch-template',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <div class="field-checkbox">
    <s-bool-switch ngDefaultControl [formControl]="formControl" [formlyAttributes]="field" [hidden]="to?.hidden"></s-bool-switch>
    <label>{{ to?.label }}</label>
  </div>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BoolSwitchTemplateComponent),
      multi: true,
    },
  ],
})
export class BoolSwitchTemplateComponent extends FieldType<FieldTypeConfig> {}
