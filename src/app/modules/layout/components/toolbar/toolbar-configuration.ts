import { PermissionManager } from '@ngx-ui/core';
import { ButtonStyle, ButtonType, FontAwsomeIconSize } from '@ngx-ui/core-ui';
import { MenuItem } from 'primeng/api';

export interface ToolbarButton {
  label: string;
  tooltipText?: string;
  showLabel?: boolean;
  icon?: string;
  style?: ButtonStyle;
  type?: ButtonType;
  subButtons?: MenuItem[];

  disabled?(): boolean;

  hidden?(): boolean;

  onClick?($event: any): void;
}

export interface ToolbarConfigurationParams {
  leftGroup: ToolbarButton[];
  rightGroup: ToolbarButton[];
  defaultButtonStyle?: ButtonStyle;
  defaultButtonType?: ButtonType;
  iconSize?: FontAwsomeIconSize;
}

export interface ToolbarConfiguration {
  addLeftButton(button: ToolbarButton): ToolbarConfiguration;

  addRightButton(button: ToolbarButton): ToolbarConfiguration;

  defaultButtonStyle(buttonStyle?: ButtonStyle): ToolbarConfiguration;

  defaultButtonType(buttonType?: ButtonType): ToolbarConfiguration;

  iconSize(size?: FontAwsomeIconSize): ToolbarConfiguration;

  ifHasPermission(permission: string, fn: (c: ToolbarConfiguration) => ToolbarConfiguration): ToolbarConfiguration;
}

export class ToolbarConfigurationBuilder implements ToolbarConfiguration {
  private readonly configuration: ToolbarConfigurationParams;
  private readonly permissionManager?: PermissionManager;

  constructor(permissionManager?: PermissionManager, configuration?: ToolbarConfigurationParams) {
    this.configuration = configuration ?? {
      leftGroup: [],
      rightGroup: [],
    };
    this.permissionManager = permissionManager;
  }

  getConfiguration(): ToolbarConfigurationParams {
    return this.configuration;
  }

  ifHasPermission(permission: string, fn: (c: ToolbarConfiguration) => ToolbarConfiguration): ToolbarConfiguration {
    if (!this.permissionManager) {
      throw new Error('Function ifHasPermission can not be used if PermissionManager is not provided.');
    }
    if (this.permissionManager.hasPermission(permission)) {
      return fn(this);
    }
    return this;
  }

  addLeftButton(button: ToolbarButton): ToolbarConfiguration {
    if (button.onClick) {
      button.onClick = this.initOnClickEvent(button);
    }
    this.configuration.leftGroup = [...(this.configuration.leftGroup ? this.configuration.leftGroup : []), button];
    return this;
  }

  addRightButton(button: ToolbarButton): ToolbarConfiguration {
    if (button.onClick) {
      button.onClick = this.initOnClickEvent(button);
    }
    this.configuration.rightGroup = [...(this.configuration.rightGroup ? this.configuration.rightGroup : []), button];
    return this;
  }

  defaultButtonStyle(buttonStyle?: ButtonStyle): ToolbarConfiguration {
    this.configuration.defaultButtonStyle = buttonStyle;
    return this;
  }

  defaultButtonType(buttonType?: ButtonType): ToolbarConfiguration {
    this.configuration.defaultButtonType = buttonType;
    return this;
  }

  iconSize(size?: FontAwsomeIconSize): ToolbarConfiguration {
    this.configuration.iconSize = size;
    return this;
  }

  initOnClickEvent(button: ToolbarButton): any {
    let passedOnClick = button.onClick;
    let onClick = (e) => {
      if (e.detail && passedOnClick) {
        passedOnClick(e);
      }
    };
    return onClick;
  }
}
