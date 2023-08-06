import { Observable } from 'rxjs';
import { FunctionService } from '../function/rest';
import { ComplexGetInfo, ComplexInfo } from './info';
import { BackendRestService } from '../../services/rest.service';

interface SaveRequest<T> {
  Item: T;
}

export class ComplexGetService<T> {
  private getService: FunctionService<{ ID: string }, T>;
  constructor(protected info: ComplexGetInfo<T>, protected base: BackendRestService) {
    this.getService = new FunctionService(info.getFunctionInfo, base);
  }

  get(ID: string): Observable<T> {
    return this.getService.execute({ ID });
  }
}

export class ComplexService<T> extends ComplexGetService<T> {
  private saveService: FunctionService<SaveRequest<T>, T>;

  constructor(info: ComplexInfo<T>, base: BackendRestService) {
    super({ getFunctionInfo: info.getFunctionInfo }, base);
    this.saveService = new FunctionService<SaveRequest<T>, T>(info.saveFunctionInfo, base);
  }

  save(entity: T): Observable<T> {
    return this.saveService.execute({ Item: entity });
  }
}
