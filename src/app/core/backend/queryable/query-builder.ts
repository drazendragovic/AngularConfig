import { StructureInfo } from '../structure/info';
import { BackendQuery, BackendQueryParams, FilterOperation, FilterValue, GenericFilter } from './interfaces';

export class BackendQueryBuilder<T> implements BackendQuery<T> {
  private readonly _queryParams: BackendQueryParams<T>;

  constructor(queryParams?: BackendQueryParams<T>) {
    this._queryParams = this.clone(queryParams ?? {});
  }

  take(take?: number): BackendQueryBuilder<T> {
    this._queryParams.top = take;
    return this;
  }

  skip(skip?: number): BackendQueryBuilder<T> {
    this._queryParams.skip = skip;
    return this;
  }

  orderBy(field: keyof T, order?: 'asc' | 'desc'): BackendQueryBuilder<T> {
    if (!this._queryParams.sort) this._queryParams.sort = [];

    this._queryParams.sort.push({ field, order: order ?? 'asc' });
    return this;
  }

  filterBy<S>(filter: StructureInfo<S>, value?: S): BackendQueryBuilder<T> {
    if (!this._queryParams.predefinedFilters) this._queryParams.predefinedFilters = [];

    this._queryParams.predefinedFilters.push({ filterInfo: filter, value });
    return this;
  }

  where<K extends keyof T, O extends FilterOperation<T, K>>(
    property: K,
    operation: O,
    value: FilterValue<T, K, O>
  ): BackendQueryBuilder<T> {
    if (!this._queryParams.genericFilters) this._queryParams.genericFilters = [];

    this._queryParams.genericFilters.push({ property, operation, value } as GenericFilter<T>);
    return this;
  }

  getParams(): BackendQueryParams<T> {
    return this._queryParams;
  }

  private clone(query: BackendQueryParams): BackendQueryParams {
    const { top, skip, sort, genericFilters, predefinedFilters } = query;
    return {
      top,
      skip,
      sort: this.cloneShallowObjectArray(sort),
      genericFilters: this.cloneShallowObjectArray(genericFilters),
      predefinedFilters: this.cloneShallowObjectArray(predefinedFilters),
    };
  }

  private cloneShallowObjectArray<A>(arr?: A[]) {
    return arr && arr.map((i) => ({ ...i }));
  }
}
