/* eslint-disable @angular-eslint/component-max-inline-declarations */
import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'field-wrapper',
  template: `
    <div class="field">
      <ng-container #fieldComponent></ng-container>
      <small *ngIf="showError" class="p-error">
        <formly-validation-message class="ui-message-text" [field]="field"></formly-validation-message>
      </small>
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
export class FieldWrapperComponent extends FieldWrapper {}
