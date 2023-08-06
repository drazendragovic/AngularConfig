import { Injectable } from '@angular/core';
import { LookupDataSource } from 'src/app/core';
import { Factory } from 'src/app/core/models/factory';
import { BackendLookupDataSource } from 'src/app/core/services/backend-lookup-data-source.service';
import { Clan } from '../../models/clan.model';

@Injectable({
  providedIn: 'root',
})
export class ClanLookupDataSourceFactory implements Factory<LookupDataSource> {
  constructor(private dataSourceBuilder: BackendLookupDataSource) {}

  instance(id?: string): LookupDataSource {
    return this.dataSourceBuilder
      .forQueryable(Clan.OrganizationUnitLookupInfo)
      .displayField('nameForDisplay')
      .sort('position')
      .initialFilter(id ? [{ property: 'id', operation: 'Equals', value: id }] : [])
      .autocompleteSearchFn((query, value) => query.where('name', 'Contains', value))
      .dataSource();
  }
}

@Injectable({
  providedIn: 'root',
})
export class FunkcijaLookupDataSourceFactory implements Factory<LookupDataSource> {
  constructor(private dataSourceBuilder: BackendLookupDataSource) {}

  instance(): LookupDataSource {
    return this.dataSourceBuilder
      .forQueryable(Clan.FunkcijeInfo)
      .displayField('naziv')
      .sort('naziv')
      .autocompleteSearchFn((query, value) => query.where('naziv', 'Contains', value))
      .dataSource();
  }
}
