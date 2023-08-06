import { DataSource, UiAction } from 'src/app/core';
import { Column } from './column';
import { PaginatorOptions } from './paginatorOptions';
import { TableOptions } from './tableOptions';
import { TooltipOptions } from './tooltipOptions';
import { TableSelectionType } from './tableSelectionType';

export interface TableConfigurationParams<T> {
  columns: Column<T>[];
  dataSource?: DataSource<T>;
  paginatorOptions?: PaginatorOptions;
  checkBoxSelection?: boolean;
  rowActions?: UiAction[];
  id: string;
  tableOptions?: TableOptions;
  rowStyleClass?: (row: T) => string;
  rowTooltip?: TooltipOptions;
  rowActionWidth?: number;
  showRowExpansion?: (row: T) => boolean;
  actionHeaderLeft?: string;
  actionHeaderRight?: string;
  selectionType: TableSelectionType;
}
