import { Entity } from '../../models/entity/entity';

export interface LookupDataSourceParams<T extends Entity> {
  displayField: keyof T;
  valueField?: keyof T;
  sortField: keyof T;
  sortDirection?: 'asc' | 'desc';
}
