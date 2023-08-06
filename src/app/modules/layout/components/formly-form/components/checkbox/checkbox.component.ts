/* eslint-disable @angular-eslint/no-forward-ref */
import { ChangeDetectionStrategy, Component, forwardRef, Inject } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { UIConfig } from 'src/app/core';
import { APP_CONFIG } from 'src/app/core/configuration/config.constants';
import { ValueAccessorBase } from '../value-accessor-base';

@Component({
  selector: 's-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent extends ValueAccessorBase {
  constructor(@Inject(APP_CONFIG) private config: UIConfig) {
    super(config);
  }
}
