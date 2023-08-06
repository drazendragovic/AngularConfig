/* eslint-disable @angular-eslint/component-max-inline-declarations */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 's-table-icon-column',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="center-icon" [class]="iconClass" [style.color]="color"></span>`,
  styles: [
    `
      .center-icon {
        align-items: center;
        display: flex;
        justify-content: center;
        font-size: 1.2rem;
      }
    `,
  ],
})
export class IconColumnComponent {
  @Input() iconClass = '';
  @Input() color: any;
}
