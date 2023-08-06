import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, delay, of, throwError, timeout } from 'rxjs';
import { BACKEND_CONFIG } from '../configuration/config.constants';
import { BackendConfig } from '../models/backend/backendConfig';
import { HttpMethods, RequestData } from '../models/backend/requestData';

@Injectable()
export class BackendRestService {
  protected _rootUrl: string;
  protected delete404OK: boolean;
  protected timeout: number;
  protected getDelay: number;
  protected saveDelay: number;

  constructor(@Inject(BACKEND_CONFIG) protected config: BackendConfig, protected http: HttpClient) {
    const { delete404OK = true, getDelay = 0, saveDelay = 0, timeout: to = 0 } = config || {};

    this._rootUrl = config.url;
    this.delete404OK = delete404OK;
    this.getDelay = getDelay;
    this.saveDelay = saveDelay;
    this.timeout = to;
  }

  request<T>(key: string, method: HttpMethods, path?: string, data?: unknown, params?: HttpParams): Observable<T> {
    const req: RequestData = {
      method,
      url: this.getStructureUrl(key, path),
      data,
      params,
    };
    let result$: Observable<T>;

    switch (req.method) {
      case 'GET':
        result$ = this.http.get<T>(req.url, { params });
        if (this.getDelay) {
          result$ = result$.pipe(delay(this.getDelay));
        }
        break;
      case 'POST':
        result$ = this.http.post<T>(req.url, data, { params });
        if (this.saveDelay) {
          result$ = result$.pipe(delay(this.saveDelay));
        }
        break;
      case 'PUT':
        result$ = this.http.put<T>(req.url, data, { params });
        if (this.saveDelay) {
          result$ = result$.pipe(delay(this.saveDelay));
        }
        break;
      case 'DELETE':
        result$ = this.http.delete<T>(req.url, { params });
        if (this.saveDelay) {
          result$ = result$.pipe(delay(this.saveDelay));
        }
        break;
      default: {
        result$ = throwError(() => new Error(`${method} http method not implemented for BackendRestService.`));
      }
    }
    if (this.timeout) {
      result$ = result$.pipe(timeout(this.timeout + this.saveDelay));
    }
    return result$.pipe(catchError<T, Observable<never>>(this.handleError(req)));
  }

  private handleError(reqData: RequestData): (err: HttpErrorResponse) => Observable<never> {
    return (err: HttpErrorResponse) => {
      console.log(err);
      const ok = this.handleDelete404(err, reqData);
      if (ok) {
        return ok as Observable<never>;
      }
      return throwError(() => err);
    };
  }

  private handleDelete404(error: HttpErrorResponse, reqData: RequestData): Observable<never | unknown> | undefined {
    if (error.status === 400 && reqData.method === 'DELETE' && this.delete404OK) {
      return of({});
    }
    return undefined;
  }

  private getRestUrl(rootUrl: string): string {
    return (rootUrl.slice(-1) === '/' ? rootUrl : `${rootUrl}/`) + 'api/v1/';
  }

  private getStructureUrl(key: string, path?: string): string {
    return this.getRestUrl(this._rootUrl) + key + '/' + (path ?? '');
  }
}
