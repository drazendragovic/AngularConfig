import { ComponentInfo } from '../../shared/dynamic-host.component';
import { TooltipOptions } from './tooltipOptions';

export interface Column<T> {
  field?: keyof T;
  header: string;
  format?: (data: any) => string;
  componentInfo?: ComponentInfo;
  templateName?: string;
  styleClass?: (row?: T) => string;
  disableResize?: boolean;
  tooltip?: TooltipOptions;
  sortable?: boolean;
}
