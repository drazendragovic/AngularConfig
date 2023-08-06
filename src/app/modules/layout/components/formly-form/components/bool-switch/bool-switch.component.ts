/* eslint-disable @angular-eslint/no-forward-ref */
import { ChangeDetectionStrategy, Component, forwardRef, Inject } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { UIConfig } from 'src/app/core';
import { APP_CONFIG } from 'src/app/core/configuration/config.constants';
import { ValueAccessorBase } from '../value-accessor-base';

@Component({
  selector: 's-bool-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bool-switch.component.html',
  styleUrls: ['./bool-switch.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BoolSwitchComponent),
      multi: true,
    },
  ],
})
export class BoolSwitchComponent extends ValueAccessorBase {
  constructor(@Inject(APP_CONFIG) private config: UIConfig) {
    super(config);
  }
}
