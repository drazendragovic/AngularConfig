import { PermissionManager } from '../shared/interfaces/permission-manager';
import { sortOrderedItems } from '../shared/interfaces/ordered-item';
import { UITabsConfiguration } from './interfaces/uITabsConfiguration';
import { UITabsConfigurationParams } from './interfaces/uITabsConfigurationParams';
import { UITab } from './interfaces/uITab';

export class UITabsConfigurationBuilder implements UITabsConfiguration {
  private readonly config: UITabsConfigurationParams;
  private readonly permissionManager?: PermissionManager;

  constructor(permissionManager?: PermissionManager) {
    this.permissionManager = permissionManager;
    this.config = { tabs: [], initialTabIndex: 0 };
  }

  addTab(param: UITab): UITabsConfiguration {
    this.config.tabs = [...this.config.tabs, param];
    return this;
  }

  getConfiguration(): UITabsConfigurationParams {
    this.config.tabs = sortOrderedItems(this.config.tabs);
    return this.config;
  }

  initialTabIndex(tabIndex: number): UITabsConfiguration {
    this.config.initialTabIndex = tabIndex;
    return this;
  }

  ifHasPermission(permission: string, fn: (c: UITabsConfiguration) => UITabsConfiguration): UITabsConfiguration {
    if (!this.permissionManager) {
      throw new Error('Function ifHasPermission can not be used if PermissionManager is not provided');
    }
    if (this.permissionManager.hasPermission(permission)) {
      return fn(this);
    }
    return this;
  }
}
