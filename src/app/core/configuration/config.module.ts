import { ModuleWithProviders, NgModule } from '@angular/core';
import { ConfigService } from './config.service';
import { APP_CONFIG } from './config.constants';

@NgModule()
export class ConfigModule {
  constructor(private _configService: ConfigService) {}

  static forRoot(config: any): ModuleWithProviders<ConfigModule> {
    return {
      ngModule: ConfigModule,
      providers: [
        {
          provide: APP_CONFIG,
          useValue: config,
        },
      ],
    };
  }
}
