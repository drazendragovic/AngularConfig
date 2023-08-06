import { UITab } from './uITab';

export interface UITabsConfiguration {
  addTab(param: UITab): UITabsConfiguration;
  initialTabIndex(tabIndex: number): UITabsConfiguration;
  ifHasPermission(permission: string, fn: (c: UITabsConfiguration) => UITabsConfiguration): UITabsConfiguration;
}
