import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  constructor() {}

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
