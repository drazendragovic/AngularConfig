/* eslint-disable @angular-eslint/component-max-inline-declarations */
import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'app-panel-wrapper',
  template: `
    <div class="form-card">
      <p-panel [toggleable]="props['togle']" [toggler]="'header'" [(collapsed)]="props['collaps']">
        <ng-template pTemplate="header">
          <span class="text-primary font-medium text-sm">{{ props.label }}</span>
        </ng-template>
        <ng-template pTemplate="headericons">
          <ng-container *ngIf="props['collaps']">
            <i class="pi pi-chevron-down"></i>
          </ng-container>
          <ng-container *ngIf="!props['collaps']">
            <i class="pi pi-chevron-right"></i>
          </ng-container>
        </ng-template>
        <ng-container #fieldComponent></ng-container>
      </p-panel>
    </div>
  `,
})
export class PanelWrapperComponent extends FieldWrapper {}
