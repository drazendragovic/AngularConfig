import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { StructureService } from '../structure/rest';
import { RecordsWithCount, BackendQueryFn, BackendQueryParams } from './interfaces';
import { BackendQueryBuilder } from './query-builder';
import { getQueryHttpParams } from './util';
import { Entity } from '../../models/entity/entity';
import { IBaseResponse } from '../../models/backend/iBaseResponse';

export class QueryableService<T extends Entity> extends StructureService {
  single(id: string): Observable<T> {
    return this.restService.request<T>(this._key, 'GET', id);
  }

  all(): Observable<T[]> {
    return this.restService.request<IBaseResponse<T>>(this._key, 'GET').pipe(map((x) => x?.data.list));
  }

  records(queryFn?: BackendQueryFn<T>): Observable<T[]> {
    const params = processBackendQueryFn(queryFn);

    return this.restService.request<IBaseResponse<T>>(this._key, 'GET', '', {}, getQueryHttpParams(params)).pipe(map((x) => x?.data.list));
  }

  count(queryFn?: BackendQueryFn<T>): Observable<number> {
    const params = processBackendQueryFn(queryFn);

    return this.restService
      .request<{ TotalCount: number }>(this._key, 'GET', 'TotalCount', {}, getQueryHttpParams(params))
      .pipe(pluck('TotalCount'));
  }

  recordsWithCount(queryFn?: BackendQueryFn<T>): Observable<RecordsWithCount<T>> {
    const params = processBackendQueryFn(queryFn);
    return this.restService
      .request<{ Records: T[]; TotalCount: number }>(this._key, 'GET', 'RecordsAndTotalCount', {}, getQueryHttpParams(params))
      .pipe(map((res) => <RecordsWithCount<T>>{ records: res.Records, totalCount: res.TotalCount }));
  }
}

export function processBackendQueryFn<T>(queryFn?: BackendQueryFn<T>): BackendQueryParams<T> {
  return queryFn ? (queryFn(new BackendQueryBuilder<T>()) as BackendQueryBuilder<T>).getParams() : {};
}
