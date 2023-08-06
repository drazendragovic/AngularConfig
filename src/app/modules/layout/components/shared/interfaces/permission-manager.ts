import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface UserSpecificData {
  loadUserData: () => Observable<void>;
}

export const PERMISSION_MANAGER = new InjectionToken<PermissionManager>('PERMISSION_MANAGER');

export interface PermissionManager extends UserSpecificData {
  hasPermission: (permission: string) => boolean;
}
