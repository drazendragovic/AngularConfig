import { Component, Inject, Input } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';
import { FormState } from '../../configuration/ui-formly-configuration';
import { UIConfig } from 'src/app/core';
import { APP_CONFIG } from 'src/app/core/configuration/config.constants';

@Component({
  selector: 'ngx-ui-detail-form-template',
  templateUrl: 'detail-form-template.component.html',
  styleUrls: ['detail-form-template.component.scss'],
})
export class DetailFormTemplateComponent extends FieldArrayType {
  constructor(@Inject(APP_CONFIG) private UiConfig: UIConfig) {
    super();
  }

  @Input() trashIcon = this.UiConfig.icons.trashIcon;
  @Input() plusIcon = this.UiConfig.icons.plusIcon;
  readonly readOnlyState = FormState.ReadOnly;

  public override remove(i: number, onRemove: any): void {
    super.remove(i);
    onRemove();
  }
}
