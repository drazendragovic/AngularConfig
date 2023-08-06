import { ComponentInfo } from '../../shared/dynamic-host.component';
import { OrderedItem } from '../../shared/interfaces/ordered-item';

export interface UITab extends ComponentInfo, OrderedItem {
  label: string;
  hidden?(): boolean;
  cache?(): boolean;
}
