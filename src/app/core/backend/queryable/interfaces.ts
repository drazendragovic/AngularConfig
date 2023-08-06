import { SafeAny } from '../../models/api/safe-any';
import { StructureInfo } from '../structure/info';

export interface Records<T = unknown> {
  records: T[];
}

export interface TotalCount {
  totalCount: number;
}

export interface RecordsWithCount<T = unknown> extends Records<T>, TotalCount {}

export type BackendSortOrder = 'asc' | 'desc';

export interface BackendSortModel<T = SafeAny, K extends keyof T = keyof T> {
  field: K;
  order?: BackendSortOrder;
}

export type BackendFilter<T = SafeAny> = GenericFilter<T> | PredefinedFilter;

export interface GenericFilter<T, K extends keyof T = keyof T, O extends FilterOperation<T, K> = FilterOperation<T, K>> {
  property: K;
  operation: O;
  value: FilterValue<T, K, O>;
}

export type FilterValue<T, K extends keyof T, O extends FilterOperation<T, K>> = O extends ArrayOperation
  ? T[K][]
  : O extends 'DateIn' | 'DateNotIn'
  ? string
  : T[K];

export type FilterOperation<T, K extends keyof T> =
  | EqualsOperation
  | ArrayOperation
  | (T[K] extends string | undefined ? StringOperation : never)
  | (T[K] extends Date | undefined ? DateOperation | CompareOperation : never)
  | (T[K] extends number | undefined ? CompareOperation : never);

export type EqualsOperation = 'Equals' | 'NotEquals';
export type CompareOperation = 'Greater' | 'GreaterEqual' | 'Less' | 'LessEqual';
export type ArrayOperation = 'In' | 'NotIn';
export type StringOperation = 'StartsWith' | 'EndsWith' | 'Contains' | 'NotContains';
export type DateOperation = 'DateIn' | 'DateNotIn';

export interface PredefinedFilter<T = unknown> {
  filterInfo: StructureInfo<T>;
  value?: T;
}

export interface BackendQueryParams<T = SafeAny> {
  skip?: number;
  top?: number;
  sort?: BackendSortModel<T>[];
  predefinedFilters?: PredefinedFilter[];
  genericFilters?: GenericFilter<T>[];
}

export interface BackendQuery<T> {
  take(take?: number): BackendQuery<T>;
  skip(skip?: number): BackendQuery<T>;
  orderBy(field: keyof T, order?: 'asc' | 'desc'): BackendQuery<T>;
  filterBy<S>(filter: StructureInfo<S>, value?: S): BackendQuery<T>;
  where<K extends keyof T, O extends FilterOperation<T, K>>(property: K, operation: O, value: FilterValue<T, K, O>): BackendQuery<T>;
}

export type BackendQueryFn<T> = (query: BackendQuery<T>) => BackendQuery<T>;
