import { iif, Observable, of, Subject } from 'rxjs';
import { catchError, delay, finalize, switchMap, tap } from 'rxjs/operators';
import { DataSource } from '../../models/dataSource/data-source';
import { Entity } from '../../models/entity/entity';
import { BackendRest } from '../api';
import { BackendQueryParams, BackendQueryFn, BackendSortModel, GenericFilter, PredefinedFilter } from '../queryable/interfaces';
import { BackendQueryBuilder } from '../queryable/query-builder';
import { QueryableService } from '../queryable/rest';
import { StructureInfo } from '../structure/info';

export class BackendQueryableDataSource<T extends Entity> implements DataSource<T> {
  readonly total$!: Observable<number>;
  readonly loading$!: Observable<boolean>;
  protected fetchData$$ = new Subject<BackendQueryParams<T>>();
  protected fetchTotal$$ = new Subject<BackendQueryFn<T>>();
  protected loadingIndicatorTrigger$$ = new Subject<boolean>();
  protected throwError$$ = new Subject<Error>();
  readonly error$ = this.throwError$$.asObservable();
  protected queryableService: QueryableService<T>;
  protected _lastQueryParams?: BackendQueryParams<T>;
  protected initialQueryParams?: BackendQueryParams<T>;
  protected _sort: { field: keyof T; sortDirection: 'asc' | 'desc' }[] = [];

  constructor(structureInfo: StructureInfo<T>, backendRest: BackendRest) {
    this.queryableService = backendRest.forQueryable(structureInfo);

    this.loading$ = this.loadingIndicatorTrigger$$.pipe(switchMap((value) => iif(() => value, of(value).pipe(delay(900)), of(value))));

    //this.total$ = this.fetchTotal$$.pipe(switchMap((query) => this.queryableService.count(query)));

    this._data$ = this.fetchData$$.pipe(
      tap(() => {
        this.loadingIndicatorTrigger$$.next(true);
      }),
      switchMap((e: BackendQueryParams<T>) => {
        const q = new BackendQueryBuilder<T>(e);
        this.fetchTotal$$.next(() => q);
        this._lastQueryParams = q.getParams();
        return this.queryableService
          .records(() => q)
          .pipe(
            catchError((err) => {
              this.throwError$$.next(err);
              return of([]);
            }),
            finalize(() => {
              this.loadingIndicatorTrigger$$.next(false);
            })
          );
      })
    );
  }

  protected _data$: Observable<T[]>;

  public get data$(): Observable<T[]> {
    return this._data$;
  }

  public get lastQueryParams(): BackendQueryParams<T> | undefined {
    return this._lastQueryParams;
  }

  getSort(): { field: keyof T; sortDirection: 'asc' | 'desc' }[] {
    return this._sort;
  }

  query(skip?: number, take?: number): void {
    const params = { ...(this._lastQueryParams ?? this.initialQueryParams ?? {}), skip, top: take };
    this.fetchData$$.next(params);
  }

  sort(field: keyof T, sortDirection: 'asc' | 'desc' = 'asc'): DataSource<T> {
    this._lastQueryParams = undefined;
    this._sort = [{ field: field, sortDirection: sortDirection }];
    this.initialQueryParams = { ...(this.initialQueryParams ?? {}), sort: [{ field, order: sortDirection }] };
    return this;
  }

  sortMultiple(sort: { field: keyof T; sortDirection: 'asc' | 'desc' }[]): DataSource<T> {
    this._lastQueryParams = undefined;
    this._sort = sort;
    const backendSortModel: BackendSortModel<T>[] = [];
    sort.map((x) => backendSortModel.push({ field: x.field, order: x.sortDirection }));
    this.initialQueryParams = { ...(this.initialQueryParams ?? {}), sort: backendSortModel };
    return this;
  }

  filter(genericFilters?: GenericFilter<T>[], predefinedFilters?: PredefinedFilter[]): DataSource<T> {
    this._lastQueryParams = undefined;
    this.initialQueryParams = { ...(this.initialQueryParams ?? {}), genericFilters, predefinedFilters };
    return this;
  }

  postProcess(postProcess: (result: T[]) => Observable<T[]>): DataSource<T> {
    this._data$ = this._data$.pipe(switchMap((result) => postProcess(result)));
    return this;
  }
}
