import { HttpParams } from '@angular/common/http';

export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface RequestData {
  method: HttpMethods;
  url: string;
  data?: unknown;
  params?: HttpParams;
}
