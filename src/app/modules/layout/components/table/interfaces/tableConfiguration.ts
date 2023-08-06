import { Type } from '@angular/core';
import { ActionConfiguration, DataSource } from 'src/app/core';
import { ColumnConfiguration } from './columnConfiguration';
import { TableSelectionType } from './tableSelectionType';
import { TooltipOptions } from './tooltipOptions';
import { FieldColumnConfiguration } from './fieldColumnConfiguration';

export interface TableConfiguration<T> {
  id(id: string): TableConfiguration<T>;

  addColumn(
    header: string,
    field: keyof T,
    config?: (c: FieldColumnConfiguration<T>) => FieldColumnConfiguration<T>
  ): TableConfiguration<T>;

  addComponentColumn(
    header: string,
    component: Type<any>,
    initFn?: (instance: any, data: any) => void,
    config?: (c: ColumnConfiguration<T>) => ColumnConfiguration<T>
  ): TableConfiguration<T>;

  addTemplateColumn(
    header: string,
    template: string,
    config?: (c: ColumnConfiguration<T>) => ColumnConfiguration<T>
  ): TableConfiguration<T>;

  addAction(
    label: string,
    icon: string,
    action: ($event: any, row: T) => void,
    config?: (c: ActionConfiguration<T>) => ActionConfiguration<T>
  ): TableConfiguration<T>;

  dataSource(dataSource: DataSource<T>): TableConfiguration<T>;

  modifyDataSource(d: (dataSource: DataSource<T>) => DataSource<T>): TableConfiguration<T>;

  paginate(
    defaultRows: number,
    rowsPerPageOptions: number[],
    showCurrentPageReport: boolean,
    currentPageReportTemplate: string
  ): TableConfiguration<T>;

  removePaginator(): TableConfiguration<T>;

  selectionType(selectionType: TableSelectionType): TableConfiguration<T>;

  ifHasPermission(permission: string, fn: (c: TableConfiguration<T>) => TableConfiguration<T>): TableConfiguration<T>;

  tableOptions(autoLayout: boolean, scrollable: boolean, resizableColumns: boolean): TableConfiguration<T>;

  rowStyleClass(styleClass: (row: T) => string): TableConfiguration<T>;

  rowTooltip(rowTooltip: TooltipOptions): TableConfiguration<T>;

  rowActionWidth(width: number): TableConfiguration<T>;

  showRowExtension(fn: (row: T) => boolean): TableConfiguration<T>;

  actionHeaderLeft(header: string): TableConfiguration<T>;

  actionHeaderRight(header: string): TableConfiguration<T>;
}
