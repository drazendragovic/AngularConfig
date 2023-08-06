import { Column } from './column';
import { TooltipOptions } from './tooltipOptions';

export class ColumnConfiguration<T> {
  config: Column<T>;

  constructor(config: Column<T>) {
    this.config = config;
  }

  styleClass(styleClass?: (row?: T) => string): this {
    this.config.styleClass = styleClass;
    return this;
  }

  disableResize(): this {
    this.config.disableResize = true;
    return this;
  }

  tooltip(t?: TooltipOptions): this {
    this.config.tooltip = t;
    return this;
  }

  sortable(): this {
    this.config.sortable = true;
    return this;
  }
}
