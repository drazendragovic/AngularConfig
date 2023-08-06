/* eslint-disable @angular-eslint/no-forward-ref */
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Inject, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessorBase } from '../value-accessor-base';
import { UIConfig } from 'src/app/core';
import { APP_CONFIG } from 'src/app/core/configuration/config.constants';

@Component({
  selector: 's-short-string',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './short-string.component.html',
  styleUrls: ['./short-string.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ShortStringComponent),
      multi: true,
    },
  ],
})
export class ShortStringComponent extends ValueAccessorBase implements OnInit, AfterViewInit {
  @Input() maxLen = 0;
  @Input() pattern = '';
  @Input() type = 'text';

  constructor(private cdRef: ChangeDetectorRef, @Inject(APP_CONFIG) private config: UIConfig) {
    super(config);
  }

  ngOnInit(): void {
    if (!this.maxLen) this.maxLen = this.config.shortString.maxLength;

    if (this.disabled === true) this.formControl.disable();
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }
}
