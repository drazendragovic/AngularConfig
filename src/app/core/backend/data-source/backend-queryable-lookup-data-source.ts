import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { auditTime, catchError, switchMap, takeUntil, tap } from 'rxjs/operators';
import { BackendQueryParams, GenericFilter, PredefinedFilter } from '../queryable/interfaces';
import { Entity } from '../../models/entity/entity';
import { LookupDataSourceParams } from './lookup-data-source-params';
import { BackendQueryBuilder } from '../queryable/query-builder';
import { StructureInfo } from '../structure/info';
import { BackendRest } from '../api';
import { LookupDataSource } from '../../models/dataSource/lookup-data-source';
import { QueryableService } from '../queryable/rest';

export interface BackendQueryableFilters<T> {
  genericFilters?: GenericFilter<T>[];
  predefinedFilters?: PredefinedFilter[];
}

export interface BackendQueryableLookupDataSourceParams<T extends Entity> extends LookupDataSourceParams<T> {
  genericFilters?: GenericFilter<T>[];
  predefinedFilters?: PredefinedFilter[];
  autocompleteSearchFn?: (query: BackendQueryBuilder<T>, value: string) => BackendQueryBuilder<T>;
  cascadeFilterFn?: (filter: any) => BackendQueryableFilters<T> | undefined;
}

export class BackendQueryableLookupDataSourceBuilder<T extends Entity> {
  protected readonly structureInfo: StructureInfo<T>;
  protected readonly backendRest: BackendRest;
  protected readonly params: BackendQueryableLookupDataSourceParams<T>;

  constructor(info: StructureInfo<T>, backendRest: BackendRest) {
    this.backendRest = backendRest;
    this.structureInfo = info;
    this.params = {
      displayField: 'id',
      sortField: 'id',
    };
  }

  displayField(displayField: keyof T): this {
    this.params.displayField = displayField;
    return this;
  }

  valueField(valueField: keyof T): this {
    this.params.valueField = valueField;
    return this;
  }

  sort(field: keyof T, sortDirection: 'asc' | 'desc' = 'asc'): this {
    this.params.sortField = field;
    this.params.sortDirection = sortDirection;
    return this;
  }

  autocompleteSearchFn(searchFn: (query: BackendQueryBuilder<T>, value: string) => BackendQueryBuilder<T>): this {
    this.params.autocompleteSearchFn = searchFn;
    return this;
  }

  initialFilter(genericFilters?: GenericFilter<T>[], predefinedFilters?: PredefinedFilter[]): this {
    this.params.genericFilters = genericFilters;
    this.params.predefinedFilters = predefinedFilters;
    return this;
  }

  cascadeFilter(cascadeFilterFn: (filter: any) => BackendQueryableFilters<T> | undefined): this {
    this.params.cascadeFilterFn = cascadeFilterFn;
    return this;
  }

  dataSource(): BackendQueryableLookupDataSource<T> {
    return new BackendQueryableLookupDataSource(this.structureInfo, this.backendRest, this.params);
  }

  configuration(): BackendQueryableLookupDataSourceParams<T> {
    return this.params;
  }
}

export class BackendQueryableLookupDataSource<T extends Entity> implements LookupDataSource {
  protected data$$ = new BehaviorSubject<T[]>([]);
  protected throwError$$ = new Subject<Error>();
  protected fetchData$$ = new Subject<BackendQueryParams<T>>();
  protected destroy$$ = new Subject<void>();

  protected queryableService: QueryableService<T>;
  protected readonly configuration: BackendQueryableLookupDataSourceParams<T>;

  protected cascadeFilters?: BackendQueryableFilters<T>;

  readonly displayField: string;
  readonly valueField: string;
  readonly data$: Observable<T[]> = this.data$$.asObservable();
  readonly error$ = this.throwError$$.asObservable();

  constructor(structureInfo: StructureInfo<T>, backendRest: BackendRest, configuration: BackendQueryableLookupDataSourceParams<T>) {
    this.configuration = configuration;
    this.displayField = configuration.displayField as string;
    this.valueField = (configuration.valueField as string) ?? 'id';

    this.queryableService = backendRest.forQueryable(structureInfo);

    this.fetchData$$
      .pipe(
        auditTime(0),
        switchMap((e: BackendQueryParams<T>) => {
          const query = new BackendQueryBuilder<T>(e);
          return this.queryableService
            .records(() => query)
            .pipe(
              catchError((err) => {
                this.throwError$$.next(err);
                return of([]);
              })
            );
        }),
        takeUntil(this.destroy$$)
      )
      .subscribe(this.data$$);
  }

  destroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }

  search(value: string): void {
    if (!this.configuration.autocompleteSearchFn) {
      throw new Error('autocompleteSearchFn function is not supported if searchFn is not provided in configuration.');
    }
    let query = this.getInitialQuery();
    query = this.configuration.autocompleteSearchFn(query, value);
    this.fetchData$$.next(query.getParams());
  }

  protected getInitialQuery(): BackendQueryBuilder<T> {
    let genericFilters = this.configuration.genericFilters ?? [];
    if (this.cascadeFilters?.genericFilters) {
      genericFilters = [...genericFilters, ...this.cascadeFilters.genericFilters];
    }
    let predefinedFIltres = this.configuration.predefinedFilters ?? [];
    if (this.cascadeFilters?.predefinedFilters) {
      predefinedFIltres = [...predefinedFIltres, ...this.cascadeFilters.predefinedFilters];
    }

    return new BackendQueryBuilder<T>({
      sort: [{ field: this.configuration.sortField, order: this.configuration.sortDirection }],
      genericFilters: genericFilters,
      predefinedFilters: predefinedFIltres,
    });
  }

  load(): void {
    this.fetchData$$.next(this.getInitialQuery().getParams());
  }

  loadIds(...ids: string[]): Observable<any> {
    const query = new BackendQueryBuilder<T>();
    const filterValues = ids as unknown as T[keyof T][];
    query.where(this.valueField as keyof T, 'In', filterValues);
    return this.queryableService
      .records(() => query)
      .pipe(
        tap((response) => this.data$$.next([...this.data$$.value, ...response])),
        catchError((err) => {
          this.throwError$$.next(err);
          return of([]);
        })
      );
  }

  cascadeFilter(filter: any): void {
    if (!this.configuration.cascadeFilterFn) {
      throw new Error('cascadeFilterFn function is not supported if searchFn is not provided in configuration.');
    }
    this.cascadeFilters = this.configuration.cascadeFilterFn(filter);
    this.load();
  }

  filter(genericFilters?: GenericFilter<T>[], predefinedFilters?: PredefinedFilter[]): void {
    this.configuration.genericFilters = genericFilters;
    this.configuration.predefinedFilters = predefinedFilters;
    this.load();
  }

  currentData(): T[] {
    return this.data$$.value;
  }
}
