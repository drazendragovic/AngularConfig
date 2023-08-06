/* eslint-disable @angular-eslint/component-max-inline-declarations */
import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'title-wrapper',
  template: `
    <div class="title-wrapper">
      <div class="field-title p-2 mb-3 border-bottom-2 surface-border">
        <span class="text-primary font-medium text-sm">{{ props.label }}</span>
      </div>
      <ng-container #fieldComponent></ng-container>
    </div>
  `,
  styles: [
    `
      formly-validation-message {
        font-size: 0.85rem;
      }
    `,
  ],
})
export class TitleWrapperComponent extends FieldWrapper {}
