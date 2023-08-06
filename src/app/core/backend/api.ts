import { Injectable } from '@angular/core';
import { BackendRestService } from '../services/rest.service';
import { StructureInfo } from './structure/info';
import { ActionService } from './action/action';
import { Entity } from '../models/entity/entity';
import { QueryableService } from './queryable/rest';
import { EntityService } from './entity/service';
import { FunctionService } from './function/rest';
import { FunctionInfo } from './function/info';
import { ComplexGetService, ComplexService } from './complex/rest';
import { ComplexGetInfo, ComplexInfo } from './complex/info';

@Injectable()
export class BackendRest {
  constructor(protected backendRest: BackendRestService) {}

  forAction<T>(info: StructureInfo<T>): ActionService<T> {
    return new ActionService(info, this.backendRest);
  }

  forQueryable<T extends Entity>(info: StructureInfo<T>): QueryableService<T> {
    return new QueryableService(info, this.backendRest);
  }

  forEntity<T extends Entity>(info: StructureInfo<T>): EntityService<T> {
    return new EntityService(info, this.backendRest);
  }

  forFunction<T, R>(info: FunctionInfo<T, R>): FunctionService<T, R> {
    return new FunctionService<T, R>(info, this.backendRest);
  }

  forComplexGet<T>(info: ComplexGetInfo<T>): ComplexGetService<T> {
    return new ComplexGetService<T>(info, this.backendRest);
  }

  forComplex<T>(info: ComplexInfo<T>): ComplexService<T> {
    return new ComplexService<T>(info, this.backendRest);
  }
}
