import { Type } from '@angular/core';
import { ColumnConfiguration } from '../interfaces/columnConfiguration';
import { TableSelectionType } from '../interfaces/tableSelectionType';
import { TooltipOptions } from '../interfaces/tooltipOptions';
import { TableConfigurationParams } from '../interfaces/tableConfigurationParams';
import { DefaultPaginatorOptions } from '../interfaces/paginatorOptions';
import { TableConfiguration } from '../interfaces/tableConfiguration';
import { ActionConfiguration, DataSource, UiAction } from 'src/app/core';
import { FieldColumnConfiguration } from '../interfaces/fieldColumnConfiguration';
import { PermissionManager } from '../../shared/interfaces/permission-manager';

export class TableConfigurationBuilder<T> implements TableConfiguration<T> {
  private readonly configuration: TableConfigurationParams<T>;
  private readonly permissionManager?: PermissionManager;

  constructor(permissionManager?: PermissionManager) {
    this.permissionManager = permissionManager;
    this.configuration = {
      paginatorOptions: DefaultPaginatorOptions,
      columns: [],
      id: '',
      selectionType: 'none',
    };
  }

  rowTooltip(rowTooltip: TooltipOptions): TableConfiguration<T> {
    this.configuration.rowTooltip = rowTooltip;
    return this;
  }

  rowStyleClass(styleClass: (row: T) => string): TableConfiguration<T> {
    this.configuration.rowStyleClass = styleClass;
    return this;
  }

  modifyDataSource(d: (dataSource: DataSource<T>) => void): TableConfiguration<T> {
    if (!this.configuration.dataSource) {
      throw new Error('Method not allowed if dataSource is not initialized.');
    }

    d(this.configuration.dataSource);

    return this;
  }

  id(id: string): TableConfiguration<T> {
    this.configuration.id = id;
    return this;
  }

  ifHasPermission(permission: string, fn: (c: TableConfiguration<T>) => TableConfiguration<T>): TableConfiguration<T> {
    if (!this.permissionManager) {
      throw new Error('Function ifHasPermission can not be used if PermissionManager is not provided');
    }
    if (this.permissionManager.hasPermission(permission)) {
      return fn(this);
    }
    return this;
  }

  getConfiguration(): TableConfigurationParams<T> {
    if (!this.configuration.id) {
      throw new Error('Table id is not provided. Please provide table id by calling id function during configuration.');
    }
    return this.configuration;
  }

  dataSource(dataSource: DataSource<T>): TableConfiguration<T> {
    this.configuration.dataSource = dataSource;
    return this;
  }

  rowActionWidth(width = 4) {
    this.configuration.rowActionWidth = width;
    return this;
  }

  paginate(
    defaultRows: number = DefaultPaginatorOptions.defaultRows,
    rowsPerPageOptions: number[] = DefaultPaginatorOptions.rowsPerPageOptions,
    showCurrentPageReport: boolean = DefaultPaginatorOptions.showCurrentPageReport,
    currentPageReportTemplate: string = DefaultPaginatorOptions.currentPageReportTemplate
  ): TableConfiguration<T> {
    this.configuration.paginatorOptions = {
      defaultRows,
      rowsPerPageOptions,
      showCurrentPageReport,
      currentPageReportTemplate,
    };
    return this;
  }

  removePaginator(): TableConfiguration<T> {
    this.configuration.paginatorOptions = undefined;
    return this;
  }

  checkboxSelection(checkboxSelection: boolean): TableConfiguration<T> {
    this.configuration.checkBoxSelection = checkboxSelection;
    return this;
  }

  addAction(
    label: string,
    icon: string,
    action: ($event: any, row: T) => void,
    config?: (c: ActionConfiguration<T>) => ActionConfiguration<T>
  ): TableConfiguration<T> {
    const c = new ActionConfiguration<T>();
    if (!this.configuration.rowActions) {
      this.configuration.rowActions = [];
    }

    if (config) {
      config(c);
    }

    const rowAction: UiAction = {
      label,
      icon,
      style: c.config.style,
      type: c.config.type,
      action,
      visible: c.config.visible,
      position: c.config.position ?? 'left',
      tooltipPosition: c.config.tooltipPosition ?? 'left',
    };
    this.configuration.rowActions = [...this.configuration.rowActions, rowAction];
    return this;
  }

  addColumn(
    header: string,
    field: keyof T,
    config?: (c: FieldColumnConfiguration<T>) => FieldColumnConfiguration<T>
  ): TableConfiguration<T> {
    const c = new FieldColumnConfiguration<T>({ header, field });
    if (config) {
      config(c);
    }
    this.configuration.columns = [...this.configuration.columns, c.config];
    return this;
  }

  addComponentColumn(
    header: string,
    component: Type<any>,
    initFn?: (instance: any, data: any) => void,
    config?: (c: ColumnConfiguration<T>) => ColumnConfiguration<T>
  ): TableConfiguration<T> {
    const c = new ColumnConfiguration<T>({ header, field: header as keyof T });
    c.config.componentInfo = { component, initFn };
    if (config) {
      config(c);
    }
    this.configuration.columns = [...this.configuration.columns, c.config];
    return this;
  }

  tableOptions(autoLayout: boolean, scrollable: boolean, resizableColumns: boolean): TableConfiguration<T> {
    this.configuration.tableOptions = {
      autoLayout: autoLayout,
      scrollable: scrollable,
      resizableColumns: resizableColumns,
    };
    return this;
  }

  addTemplateColumn(
    header: string,
    templateName: string,
    config?: (c: ColumnConfiguration<T>) => ColumnConfiguration<T>
  ): TableConfiguration<T> {
    const c = new ColumnConfiguration<T>({
      header,
      field: header as keyof T,
      templateName,
    });
    if (config) {
      config(c);
    }
    this.configuration.columns = [...this.configuration.columns, c.config];
    return this;
  }

  showRowExtension(fn: (row: T) => boolean): TableConfiguration<T> {
    this.configuration.showRowExpansion = fn;

    return this;
  }

  actionHeaderLeft(header: string) {
    this.configuration.actionHeaderLeft = header;
    return this;
  }

  actionHeaderRight(header: string) {
    this.configuration.actionHeaderRight = header;
    return this;
  }

  selectionType(selectionType: TableSelectionType): TableConfiguration<T> {
    this.configuration.selectionType = selectionType;
    return this;
  }
}
