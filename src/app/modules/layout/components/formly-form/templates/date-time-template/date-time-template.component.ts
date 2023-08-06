/* eslint-disable @angular-eslint/no-forward-ref */
/* eslint-disable @angular-eslint/component-max-inline-declarations */
import { ChangeDetectionStrategy, Component, forwardRef, Inject } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { UIConfig } from 'src/app/core';
import { APP_CONFIG } from 'src/app/core/configuration/config.constants';

@Component({
  selector: 'date-time-template',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <s-date-time
    ngDefaultControl
    [formControl]="formControl"
    [formlyAttributes]="field"
    [label]="to?.label"
    [hidden]="props?.hidden"
    [actions]="props['actions']"
    [minDate]="props['minDate']"
    [maxDate]="props['maxDate']"
    [format]="props['format'] !== undefined ? props['format'] : defaultDateFormat"
  ></s-date-time>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimeTemplateComponent),
      multi: true,
    },
  ],
})
export class DateTimeTemplateComponent extends FieldType<FieldTypeConfig> {
  defaultDateFormat: string;

  constructor(@Inject(APP_CONFIG) private config: UIConfig) {
    super();
    this.defaultDateFormat = config.dateFormat;
  }
}
