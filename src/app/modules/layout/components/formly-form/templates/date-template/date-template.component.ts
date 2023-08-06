/* eslint-disable @angular-eslint/component-max-inline-declarations */
/* eslint-disable @angular-eslint/no-forward-ref */
import { ChangeDetectionStrategy, Component, forwardRef, Inject } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { UIConfig } from 'src/app/core';
import { APP_CONFIG } from 'src/app/core/configuration/config.constants';

@Component({
  selector: 'date-template',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <s-date
    ngDefaultControl
    [formControl]="formControl"
    [formlyAttributes]="field"
    [label]="to?.label"
    [hidden]="to?.hidden"
    [actions]="props['actions']"
    [minDate]="props['minDate']"
    [maxDate]="props['maxDate']"
    [format]="props['format'] !== undefined ? props['format'] : defaultDateFormat"
  ></s-date>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTemplateComponent),
      multi: true,
    },
  ],
})
export class DateTemplateComponent extends FieldType<FieldTypeConfig> {
  defaultDateFormat: string;

  constructor(@Inject(APP_CONFIG) private config: UIConfig) {
    super();
    this.defaultDateFormat = config.dateFormat;
  }
}
