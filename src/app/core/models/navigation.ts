export interface NavigationItem {
  id: string;
  title?: string;
  subtitle?: string;
  type: 'item' | 'group' | 'collapsable' | 'spacer';
  icon?: string;
  hidden?: boolean;
  active?: boolean;
  disabled?: boolean;
  tooltip?: string;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  externalUrl?: boolean;
  openInNewTab?: boolean;
  function?: any;
  badge?: {
    title?: string;
    bg?: string;
    fg?: string;
  };
  target?: '_blank' | '_self' | '_parent' | '_top' | string;
  children?: NavigationItem[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}
