/* eslint-disable @angular-eslint/no-forward-ref */
import { ChangeDetectionStrategy, Component, forwardRef, Inject, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessorBase } from '../value-accessor-base';
import { APP_CONFIG } from 'src/app/core/configuration/config.constants';
import { UIConfig } from 'src/app/core/models/uiConfig';

@Component({
  selector: 's-long-string',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './long-string.component.html',
  styleUrls: ['./long-string.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LongStringComponent),
      multi: true,
    },
  ],
})
export class LongStringComponent extends ValueAccessorBase implements OnInit {
  @Input() maxLen = Number.MAX_SAFE_INTEGER / 10;
  @Input() rws = 3;
  @Input() autoResize = true;
  @Input() pattern = '';

  constructor(@Inject(APP_CONFIG) private config: UIConfig) {
    super(config);
  }

  ngOnInit(): void {
    if (!this.maxLen) this.maxLen = Number.MAX_SAFE_INTEGER / 10;
  }
}
