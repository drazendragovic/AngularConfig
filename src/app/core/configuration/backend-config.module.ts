import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Provider, Type } from '@angular/core';
import { BACKEND_CONFIG } from './config.constants';
import { BackendConfig } from '../models/backend/backendConfig';
import { BackendLookupDataSource } from '../services/backend-lookup-data-source.service';
import { BackendRest } from '../backend/api';
import { BackendRestService } from '../services/rest.service';
import { LookupDataSourceFactoryService } from '../services/lookup-data-source-factory.service';

@NgModule({
  imports: [HttpClientModule],
})
export class BackendModule {
  static withConfig(config: BackendConfig): ModuleWithProviders<BackendModule> {
    return {
      ngModule: BackendModule,
      providers: createBackendProviders(config),
    };
  }
}

export function createBackendProviders(config: BackendConfig): (Provider | Type<any>)[] {
  const providers: (Provider | Type<any>)[] = [];

  if (!config) {
    console.error('You need to provide a valid BackendConfig.');
    return [];
  }

  providers.push({
    provide: BACKEND_CONFIG,
    useValue: config,
  });

  providers.push(BackendLookupDataSource);
  providers.push(LookupDataSourceFactoryService);
  providers.push(BackendRest);
  providers.push(BackendRestService);

  return providers;
}
