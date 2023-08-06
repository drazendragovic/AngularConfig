import { Injectable } from '@angular/core';
import { Entity } from '../models/entity/entity';
import { BackendLookupDataSource } from './backend-lookup-data-source.service';
import { StructureInfo } from '../backend/structure/info';
import { GenericFilter, PredefinedFilter } from '../backend/queryable/interfaces';
import { LookupDataSource } from '../models/dataSource/lookup-data-source';

@Injectable()
export class LookupDataSourceFactoryService<T extends Entity> {
  constructor(private dataSourceBuilder: BackendLookupDataSource) {}

  instance(
    structureInfo: StructureInfo<T>,
    displayField: keyof T,
    cascadeFilter?: (filter: any) => any,
    initialFilter?: { genericFilters: GenericFilter<T>[]; predefinedFilters: PredefinedFilter[] }
  ): LookupDataSource {
    return this.dataSourceBuilder
      .forQueryable(structureInfo)
      .displayField(displayField)
      .sort(displayField)
      .autocompleteSearchFn((query, value) => query.where<any, any>(displayField, 'StartsWith', value))
      .cascadeFilter(cascadeFilter)
      .initialFilter(initialFilter?.genericFilters, initialFilter?.predefinedFilters)
      .dataSource();
  }

  instanceValueField(
    structureInfo: StructureInfo<T>,
    displayField: keyof T,
    valueField: keyof T,
    sortField?: keyof T,
    cascadeFilter?: (filter: any) => any,
    initialFilter?: { genericFilters: GenericFilter<T>[]; predefinedFilters: PredefinedFilter[] }
  ): LookupDataSource {
    return this.dataSourceBuilder
      .forQueryable(structureInfo)
      .displayField(displayField)
      .valueField(valueField)
      .sort(sortField ?? displayField)
      .autocompleteSearchFn((query, value) => query.where<any, any>(displayField, 'StartsWith', value))
      .cascadeFilter(cascadeFilter)
      .initialFilter(initialFilter?.genericFilters, initialFilter?.predefinedFilters)
      .dataSource();
  }

  instanceWithFilterActive(
    structureInfo: StructureInfo<T>,
    displayField: keyof T,
    sortField?: keyof T,
    cascadeFilter?: (filter: any) => any,
    additionalFilter?: { genericFilters: GenericFilter<T>[]; predefinedFilters: PredefinedFilter[] }
  ): LookupDataSource {
    let initialFilter: GenericFilter<any>[] = [{ property: 'Active', operation: 'Equals', value: 1 }];
    if (additionalFilter?.genericFilters) {
      initialFilter = initialFilter.concat(additionalFilter.genericFilters);
    }
    return (
      this.dataSourceBuilder
        .forQueryable(structureInfo)
        .displayField(displayField)
        .sort(sortField ?? displayField)
        .autocompleteSearchFn((query, value) => query.where<any, any>(displayField, 'StartsWith', value))
        .cascadeFilter(cascadeFilter)
        //@ts-ignore
        .initialFilter(initialFilter, additionalFilter?.predefinedFilters ?? [])
        .dataSource()
    );
  }
}
