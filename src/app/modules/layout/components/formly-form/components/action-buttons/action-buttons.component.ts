import { Component, Inject, Input } from '@angular/core';
import { APP_CONFIG } from 'src/app/core/configuration/config.constants';
import { UiAction, getButtonStyleClass, getButtonTypeClass } from 'src/app/core/models/uiAction';
import { UIConfig } from 'src/app/core/models/uiConfig';

@Component({
  selector: 's-actions',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss'],
})
export class ActionButtonsComponent {
  @Input() actions: UiAction[] = [];

  constructor(@Inject(APP_CONFIG) private UiConfig: UIConfig) {}

  //TODO dodati button style
  actionClass(action: UiAction): string {
    return `${getButtonStyleClass(action.style ?? this.UiConfig.defaultActionButtonStyle)} 
            ${action.customClass}
            ${getButtonTypeClass(action.type)}`;
  }
}
