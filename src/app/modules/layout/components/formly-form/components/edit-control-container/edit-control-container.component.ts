import { Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { UiAction } from 'src/app/core';

@Component({
  selector: 's-edit-control-container',
  templateUrl: './edit-control-container.component.html',
  styleUrls: ['./edit-control-container.component.scss'],
})
export class EditControlContainerComponent {
  @Input() floatingLabel = true;
  @Input() label?: string;
  @Input() required = true;
  @Input() actions: UiAction[] = [];
  @ContentChildren(PrimeTemplate) templates!: QueryList<PrimeTemplate>;

  getTemplate(templateName: string): TemplateRef<any> {
    const t = this.templates.toArray().find((x) => x.name.toLowerCase() == templateName?.toLowerCase());
    if (!t) {
      throw new Error(`Template with name ${templateName} does not exist.`);
    }
    return t.template;
  }
}
