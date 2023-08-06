/* eslint-disable @angular-eslint/no-forward-ref */
import { ChangeDetectionStrategy, Component, forwardRef, Inject, Input } from '@angular/core';
import { ValueAccessorBase } from '../value-accessor-base';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { UIConfig } from 'src/app/core';
import { APP_CONFIG } from 'src/app/core/configuration/config.constants';

@Component({
  selector: 's-date',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateComponent),
      multi: true,
    },
  ],
})
export class DateComponent extends ValueAccessorBase {
  @Input() format = '';
  @Input() minDate = new Date('1900-1-1');
  @Input() maxDate = new Date('2900-1-1');

  constructor(@Inject(APP_CONFIG) private config: UIConfig) {
    super(config);
    this.format = config.dateFormat;
  }
}
