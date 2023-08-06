import { iif, Observable, of, Subject } from 'rxjs';
import { catchError, delay, finalize, map, switchMap, tap } from 'rxjs/operators';
import { DataSource } from '../../models/dataSource/data-source';
import { FunctionService } from '../function/rest';
import { BackendRest } from '../api';
import { FunctionInfo } from '../function/info';

export interface ElasticSearchResult<T> {
  Total?: number;
  Data?: T[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface ElasticSearchRequest<T> {
  Skip?: number;
  Take?: number;
  Sort?: string;
  Ids?: string[];
}

export class BackendElasticSearchDataSource<
  TModel,
  TSearchRequest extends ElasticSearchRequest<TModel>,
  TSearchResult extends ElasticSearchResult<TModel>
> implements DataSource<TModel>
{
  readonly loading$: Observable<boolean>;
  readonly total$: Observable<number>;
  protected fetchData$$ = new Subject<TSearchRequest>();
  protected fetchTotal$$ = new Subject<number>();
  protected loadingIndicatorTrigger$$ = new Subject<boolean>();
  protected throwError$$ = new Subject<Error>();
  readonly error$ = this.throwError$$.asObservable();
  protected _sort?: { field: keyof TModel; sortDirection: 'asc' | 'desc' };
  protected _paging?: { skip?: number; take?: number };
  protected _filter?: TSearchRequest;

  protected readonly functionService: FunctionService<TSearchRequest, TSearchResult>;

  constructor(functionInfo: FunctionInfo<TSearchRequest, TSearchResult>, backendRest: BackendRest) {
    this.functionService = backendRest.forFunction(functionInfo);

    this.loading$ = this.loadingIndicatorTrigger$$.pipe(switchMap((value) => iif(() => value, of(value).pipe(delay(500)), of(value))));

    this._data$ = this.fetchData$$.pipe(
      tap(() => {
        this.loadingIndicatorTrigger$$.next(true);
      }),
      switchMap((e: TSearchRequest) => {
        return this.functionService.execute(e).pipe(
          map((result: TSearchResult) => {
            this.fetchTotal$$.next(result.Total);
            return result.Data as TModel[];
          }),
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

    this.total$ = this.fetchTotal$$.pipe(map((total: number) => total));
  }

  protected _data$: Observable<TModel[]>;

  public get data$(): Observable<TModel[]> {
    return this._data$;
  }

  postProcess(postProcess: (result: TModel[]) => Observable<TModel[]>): DataSource<TModel> {
    this._data$ = this._data$.pipe(switchMap((result) => postProcess(result)));
    return this;
  }

  sort(sort: keyof TModel, sortDirection: 'asc' | 'desc'): DataSource<TModel> {
    this._sort = { field: sort, sortDirection: sortDirection };
    return this;
  }

  filter(filter: TSearchRequest): DataSource<TModel> {
    this._filter = filter;
    return this;
  }

  query(skip?: number, take?: number): void {
    this._paging = { skip, take };
    this.fetchData$$.next(this.getSearchRequest());
  }

  getSort(): { field: keyof TModel; sortDirection: 'asc' | 'desc' }[] {
    return this._sort ? [this._sort] : [];
  }

  private getSortString(): string | undefined {
    return this._sort ? `${String(this._sort.field)} ${this._sort.sortDirection}` : undefined;
  }

  private getSearchRequest(): TSearchRequest {
    return {
      ...this._filter,
      Skip: this._paging?.skip,
      Take: this._paging?.take,
      Sort: this.getSortString(),
    } as unknown as TSearchRequest;
  }
}
