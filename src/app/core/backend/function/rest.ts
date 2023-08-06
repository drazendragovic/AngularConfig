import { Observable } from 'rxjs';
import { StructureService } from '../structure/rest';
import { BackendRestService } from '../../services/rest.service';
import { FunctionInfoOrKey, getFunctionKey } from './info';

export interface IFunctionService<T, R> {
  execute(param: T): Observable<R>;
}

export class FunctionService<T, R> extends StructureService implements IFunctionService<T, R> {
  constructor(functionInfoOrKey: FunctionInfoOrKey, private backendRest: BackendRestService) {
    super(getFunctionKey(functionInfoOrKey), backendRest);
  }

  execute(param: T): Observable<R> {
    return this.request('POST', '', param);
  }
}
