import { MenuItem } from 'primeng/api';
import { OrderedItem, PermissionManager, sortOrderedItems } from '@ngx-ui/core';

export interface UIMenuConfiguration {
  menuItem(menuItem: OrderMenuItem): UIMenuConfiguration;
  subMenu(menuItem: OrderMenuItem, subMenu: (s: UIMenuConfiguration) => UIMenuConfiguration): UIMenuConfiguration;
  ifHasPermission(permission: string, fn: (c: UIMenuConfiguration) => UIMenuConfiguration): UIMenuConfiguration;
}

export interface OrderMenuItem extends MenuItem, OrderedItem {}

export class UIMenuConfigurationBuilder implements UIMenuConfiguration {
  private readonly permissionManager?: PermissionManager;
  private menuItems: OrderMenuItem[];

  constructor(menuItems?: MenuItem[], permissionManager?: PermissionManager) {
    this.permissionManager = permissionManager;
    this.menuItems = menuItems ?? [];
  }

  ifHasPermission(permission: string, fn: (c: UIMenuConfiguration) => UIMenuConfiguration): UIMenuConfiguration {
    if (!this.permissionManager) {
      throw new Error('Function ifHasPermission can not be used if PermissionManager is not provided');
    }
    if (this.permissionManager.hasPermission(permission)) {
      return fn(this);
    }
    return this;
  }

  menuItem(menuItem: OrderMenuItem): UIMenuConfiguration {
    this.menuItems = [...this.menuItems, menuItem];
    return this;
  }

  subMenu(menuItem: OrderMenuItem, subMenu: (s: UIMenuConfiguration) => UIMenuConfiguration): UIMenuConfiguration {
    const sub = new UIMenuConfigurationBuilder([], this.permissionManager);
    subMenu(sub);
    menuItem.items = sub.getConfiguration();
    this.menuItems = [...this.menuItems, menuItem];
    return this;
  }

  getConfiguration(): MenuItem[] {
    return sortOrderedItems(this.menuItems).map((x) => x as MenuItem);
  }
}
