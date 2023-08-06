import { Observable } from 'rxjs';
import { Entity } from '../../models/entity/entity';

export interface IEntityService<T extends Entity> {
  insert(entity: T): Observable<{ id: string }>;
  update(entity: T): Observable<void>;
  delete(id: string): Observable<string>;
}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;

export interface IDeleteMultiple {
  Ids: string[];
}
