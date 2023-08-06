export type ButtonStyle = 'default' | 'raised' | 'rounded' | 'text' | 'outlined' | 'raised-text' | 'rounded-text' | 'rounded-outlined';

export type ButtonType = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'help' | 'danger';

export type FontAwsomeIconSize = 'fa-1x' | 'fa-2x' | 'fa-3x' | 'fa-4x' | 'fa-5x' | 'fa-6x' | 'fa-7x' | 'fa-8x' | 'fa-9x' | 'fa-10x';

export type TableActionPosition = 'left' | 'right';

export type TooltipPosition = 'left' | 'right' | 'top' | 'bottom';

export interface UiAction {
  label: string;
  icon: string;
  style?: ButtonStyle;
  type?: ButtonType;
  action: ($event: any, data?: any) => void;
  visible?: (data?: any) => boolean;
  position?: TableActionPosition;
  showLabel?: boolean;
  customClass?: string;
  tooltipPosition?: TooltipPosition;
}

export function getButtonStyleClass(style?: ButtonStyle): string {
  switch (style) {
    case 'raised':
      return 'p-button-raised mr-1';
    case 'rounded':
      return 'p-button-rounded mr-1';
    case 'text':
      return 'p-button-text';
    case 'outlined':
      return 'p-button-outlined mr-1';
    case 'raised-text':
      return 'p-button-raised p-button-text mr-1 mr-1';
    case 'rounded-text':
      return 'p-button-rounded p-button-text';
    case 'rounded-outlined':
      return 'p-button-rounded p-button-outlined mr-1';
    default:
      return 'mr-1';
  }
}

export function getButtonTypeClass(severity?: ButtonType): string {
  switch (severity) {
    case 'secondary':
      return 'p-button-secondary';
    case 'success':
      return 'p-button-success';
    case 'info':
      return 'p-button-info';
    case 'warning':
      return 'p-button-warning';
    case 'help':
      return 'p-button-help';
    case 'danger':
      return 'p-button-danger';
    default:
      return '';
  }
}

export interface Action<T> {
  style?: ButtonStyle;
  type?: ButtonType;
  visible?: (row: T) => boolean;
  position?: TableActionPosition;
  showLabel?: boolean;
  customClass?: string;
  tooltipPosition?: TooltipPosition;
}

export class ActionConfiguration<T> {
  config: Action<T>;

  constructor(config?: Action<T>) {
    this.config = config ?? {};
  }

  style(style: ButtonStyle): this {
    this.config.style = style;
    return this;
  }

  type(type: ButtonType): this {
    this.config.type = type;
    return this;
  }

  visible(visible: (row: T) => boolean): this {
    this.config.visible = visible;
    return this;
  }

  position(position: TableActionPosition): this {
    this.config.position = position;
    return this;
  }

  showLabel(showLabel: boolean): this {
    this.config.showLabel = showLabel;
    return this;
  }

  customClass(customClass: string): this {
    this.config.customClass = customClass;
    return this;
  }

  tooltipPosition(position: TooltipPosition): this {
    this.config.tooltipPosition = position;
    return this;
  }
}
