import { InjectionToken } from '@angular/core';
import { BackendConfig } from '../models/backend/backendConfig';

export const APP_CONFIG = new InjectionToken<any>('APP_CONFIG');

export const backendConfigDefaults: Partial<BackendConfig> = {};

export const BACKEND_CONFIG = new InjectionToken<BackendConfig>('BACKEND_CONFIG');
