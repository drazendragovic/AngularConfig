import { Injectable } from '@angular/core';
import { BackendRest } from '../backend/api';
import { BackendQueryableLookupDataSourceBuilder } from '../backend/data-source/backend-queryable-lookup-data-source';
import { StructureInfo } from '../backend/structure/info';
import { Entity } from '../models/entity/entity';
import { FunctionInfo } from '../backend/function/info';
import { BackendElasticSearchLookupDataSourceBuilder } from '../backend/data-source/backend-elastic-search-lookup-data-source';

@Injectable()
export class BackendLookupDataSource {
  constructor(private backendRest: BackendRest) {}

  forQueryable<T extends Entity>(info: StructureInfo<T>): BackendQueryableLookupDataSourceBuilder<T> {
    return new BackendQueryableLookupDataSourceBuilder<T>(info, this.backendRest);
  }

  forElastic<TModel extends Entity, TSearchRequest, TSearchResult>(
    functionInfo: FunctionInfo<TSearchRequest, TSearchResult>
  ): BackendElasticSearchLookupDataSourceBuilder<TModel, TSearchRequest, TSearchResult> {
    return new BackendElasticSearchLookupDataSourceBuilder<TModel, TSearchRequest, TSearchResult>(functionInfo, this.backendRest);
  }
}
