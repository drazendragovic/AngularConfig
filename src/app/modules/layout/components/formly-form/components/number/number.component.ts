/* eslint-disable @angular-eslint/no-forward-ref */
import { ChangeDetectionStrategy, Component, forwardRef, Inject, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessorBase } from '../value-accessor-base';
import { UIConfig } from 'src/app/core';
import { APP_CONFIG } from 'src/app/core/configuration/config.constants';

@Component({
  selector: 's-integer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberComponent),
      multi: true,
    },
  ],
})
export class NumberComponent extends ValueAccessorBase {
  @Input() min: any;
  @Input() max: any;
  @Input() minFractionDigits = 0;
  @Input() maxFractionDigits = 0;
  @Input() useGrouping = true;

  constructor(@Inject(APP_CONFIG) private config: UIConfig) {
    super(config);
  }
}
