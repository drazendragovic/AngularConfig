import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { auditTime, catchError, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Entity } from '../../models/entity/entity';
import { ElasticSearchRequest, ElasticSearchResult } from './backend-elastic-search-data-source';
import { LookupDataSourceParams } from './lookup-data-source-params';
import { FunctionInfo } from '../function/info';
import { BackendRest } from '../api';
import { LookupDataSource } from '../../models/dataSource/lookup-data-source';
import { FunctionService } from '../function/rest';

export interface BackendElasticSearchLookupDataSourceParams<TModel extends Entity, TSearchRequest extends ElasticSearchRequest<TModel>>
  extends LookupDataSourceParams<TModel> {
  autocompleteSearchFn?: (request: TSearchRequest, value: string) => TSearchRequest;
  initialFilterFn?: (request: TSearchRequest) => TSearchRequest;
  cascadeFilterFn?: (request: TSearchRequest, value: string) => TSearchRequest;
}

export class BackendElasticSearchLookupDataSourceBuilder<
  TModel extends Entity,
  TSearchRequest extends ElasticSearchRequest<TModel>,
  TSearchResult
> {
  protected readonly functionInfo: FunctionInfo<TSearchRequest, TSearchResult>;
  protected readonly backendRest: BackendRest;
  protected readonly params: BackendElasticSearchLookupDataSourceParams<TModel, TSearchRequest>;

  constructor(functionInfo: FunctionInfo<TSearchRequest, TSearchResult>, backendRest: BackendRest) {
    this.backendRest = backendRest;
    this.functionInfo = functionInfo;
    this.params = {
      displayField: 'id',
      sortField: 'id',
    };
  }

  displayField(displayField: keyof TModel): this {
    this.params.displayField = displayField;
    return this;
  }

  valueField(valueField: keyof TModel): this {
    this.params.valueField = valueField;
    return this;
  }

  sort(field: keyof TModel, sortDirection: 'asc' | 'desc' = 'asc'): this {
    this.params.sortField = field;
    this.params.sortDirection = sortDirection;
    return this;
  }

  autocompleteSearchFn(searchFn: (request: TSearchRequest, value: string) => TSearchRequest): this {
    this.params.autocompleteSearchFn = searchFn;
    return this;
  }

  initialFilter(initialFilterFn: (request: TSearchRequest) => TSearchRequest): this {
    this.params.initialFilterFn = initialFilterFn;
    return this;
  }

  cascadeFilter(cascadeFilterFn: (request: TSearchRequest, value: string) => TSearchRequest): this {
    this.params.cascadeFilterFn = cascadeFilterFn;
    return this;
  }

  dataSource(): BackendElasticSearchLookupDataSource<TModel, TSearchRequest, TSearchResult> {
    return new BackendElasticSearchLookupDataSource(this.functionInfo, this.backendRest, this.params);
  }

  configuration(): BackendElasticSearchLookupDataSourceParams<TModel, TSearchRequest> {
    return this.params;
  }
}

export class BackendElasticSearchLookupDataSource<
  TModel extends Entity,
  TSearchRequest extends ElasticSearchRequest<TModel>,
  TSearchResult extends ElasticSearchResult<TModel>
> implements LookupDataSource
{
  protected data$$ = new BehaviorSubject<TModel[]>([]);
  protected throwError$$ = new Subject<Error>();
  protected fetchData$$ = new Subject<TSearchRequest>();
  protected destroy$$ = new Subject<void>();
  protected cascadeFilterObject: any;

  protected readonly functionService: FunctionService<TSearchRequest, TSearchResult>;
  protected readonly configuration: BackendElasticSearchLookupDataSourceParams<TModel, TSearchRequest>;

  readonly displayField: string;
  readonly valueField: string;
  readonly data$: Observable<TModel[]> = this.data$$.asObservable();
  readonly error$ = this.throwError$$.asObservable();

  constructor(
    functionInfo: FunctionInfo<TSearchRequest, TSearchResult>,
    backendRest: BackendRest,
    configuration: BackendElasticSearchLookupDataSourceParams<TModel, TSearchRequest>
  ) {
    this.configuration = configuration;
    this.functionService = backendRest.forFunction(functionInfo);
    this.displayField = this.configuration.displayField as string;
    this.valueField = (this.configuration.valueField as string) ?? 'id';

    this.fetchData$$
      .pipe(
        auditTime(0),
        switchMap((e: TSearchRequest) => {
          return this.functionService.execute(e).pipe(
            map((result: TSearchResult) => result.Data as TModel[]),
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

  cascadeFilter(filter: any): void {
    if (!this.configuration.cascadeFilterFn) {
      throw new Error('cascadeFilterFn function is not supported if searchFn is not provided in configuration.');
    }
    this.cascadeFilterObject = filter;
    this.fetchData$$.next(this.getRequest());
  }

  destroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }

  load(): void {
    this.fetchData$$.next(this.getRequest());
  }

  loadIds(...ids: string[]): Observable<any> {
    const request = this.newRequest();
    request.Ids = ids;
    return this.functionService.execute(request).pipe(
      tap((response) => this.data$$.next([...this.data$$.value, ...(response.Data as TModel[])])),
      map((result) => result.Data as TModel[]),
      catchError((err) => {
        this.throwError$$.next(err);
        return of([]);
      })
    );
  }

  search(value: string): void {
    if (!this.configuration.autocompleteSearchFn) {
      throw new Error('autocompleteSearchFn function is not supported if searchFn is not provided in configuration.');
    }
    let request = this.getRequest();
    request = this.configuration.autocompleteSearchFn(request, value);
    this.fetchData$$.next(request);
  }

  protected newRequest(): TSearchRequest {
    return {
      Sort: String(this.configuration.sortField) + ' ' + this.configuration.sortDirection,
    } as TSearchRequest;
  }

  protected getRequest(): TSearchRequest {
    let request = this.newRequest();

    if (this.configuration.initialFilterFn) {
      request = this.configuration.initialFilterFn(request);
    }
    if (this.cascadeFilterObject && this.configuration.cascadeFilterFn) {
      request = this.configuration.cascadeFilterFn(request, this.cascadeFilterObject);
    }

    return request;
  }

  currentData(): TModel[] {
    return this.data$$.value;
  }
}
