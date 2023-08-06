import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BackendRestService } from '../../services/rest.service';
import { HttpMethods } from '../../models/backend/requestData';
import { InfoOrKey, getKey } from './info';

export abstract class StructureService {
  protected _key: string;

  constructor(protected infoOrKey: InfoOrKey, protected restService: BackendRestService) {
    this._key = getKey(infoOrKey);
  }

  protected request<R>(method: HttpMethods, path?: string, data?: unknown, params?: HttpParams): Observable<R> {
    return this.restService.request<R>(this._key, method, path, data, params);
  }
}
