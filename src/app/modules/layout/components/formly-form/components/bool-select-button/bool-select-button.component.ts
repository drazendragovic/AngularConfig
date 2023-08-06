/* eslint-disable @angular-eslint/no-forward-ref */
import { ChangeDetectionStrategy, Component, forwardRef, Inject, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessorBase } from '../value-accessor-base';
import { UIConfig } from 'src/app/core';
import { APP_CONFIG } from 'src/app/core/configuration/config.constants';

@Component({
  selector: 's-bool-select-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bool-select-button.component.html',
  styleUrls: ['./bool-select-button.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BoolSelectButtonComponent),
      multi: true,
    },
  ],
})
export class BoolSelectButtonComponent extends ValueAccessorBase implements OnInit {
  @Input() trueLabel!: string;
  @Input() falseLabel!: string;
  options!: { value: boolean; label: string }[];

  constructor(@Inject(APP_CONFIG) private config: UIConfig) {
    super(config);
  }

  ngOnInit(): void {
    this.options = [
      { value: false, label: this.falseLabel },
      { value: true, label: this.trueLabel },
    ];
  }
}
