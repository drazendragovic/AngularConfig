import { Observable } from 'rxjs';
import { IDeleteMultiple, IEntityService, Optional } from './interfaces';
import { InfoOrKey } from '../structure/info';
import { Entity } from '../../models/entity/entity';
import { QueryableService } from '../queryable/rest';
import { BackendRestService } from '../../services/rest.service';
import { UtilsService } from '../../utils/utils.service';

export class EntityService<T extends Entity> extends QueryableService<T> implements IEntityService<T> {
  constructor(infoOrKey: InfoOrKey<T>, restService: BackendRestService) {
    super(infoOrKey, restService);
  }

  insert(entity: Optional<T, 'id'>): Observable<{ id: string }> {
    return this.restService.request<{ id: string }>(this._key, 'POST', '', this.coerceID(entity));
  }

  update(entity: T): Observable<void> {
    return this.restService.request<void>(this._key, 'PUT', entity.id, entity);
  }

  delete(id: string): Observable<string> {
    return this.restService.request<string>(this._key, 'DELETE', id);
  }

  deleteMultiple(parameter: IDeleteMultiple): Observable<void> {
    return this.restService.request<void>(this._key + '/DeleteMultiple', 'POST', '', parameter);
  }

  private coerceID(entity: Optional<T, 'id'>) {
    return entity['id'] ? entity : { ...entity, id: UtilsService.newGuid() };
  }
}
