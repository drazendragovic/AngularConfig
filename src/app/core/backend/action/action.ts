import { Observable } from 'rxjs';
import { StructureService } from '../structure/rest';

export interface IActionService<T> {
  execute(param: T): Observable<void>;
}

export class ActionService<T> extends StructureService implements IActionService<T> {
  execute(param: T): Observable<void> {
    return this.request('POST', '', param);
  }
}
