import { Injectable } from '@angular/core';
import { SidebarComponent } from './sidebar.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private _registry: { [key: string]: SidebarComponent } = {};
  private _onSidebarFolded: BehaviorSubject<any>;
  private _onSidebarUnfolded: BehaviorSubject<any>;

  constructor() {
    this._onSidebarFolded = new BehaviorSubject(null);
    this._onSidebarUnfolded = new BehaviorSubject(null);
  }

  get onSidebarFolded(): Observable<any> {
    return this._onSidebarFolded.asObservable();
  }

  get onSidebarUnfolded(): Observable<any> {
    return this._onSidebarUnfolded.asObservable();
  }

  register(key: any, sidebar: any): void {
    if (this._registry[key]) {
      console.error(`The sidebar with the key '${key}' already exists. Either unregister it first or use a new key.`);
      return;
    }
    this._registry[key] = sidebar;
  }

  unregister(key: any): void {
    if (!this._registry[key]) {
      console.warn(`The sidebar with the key '${key}' doesn't exist in the registry.`);
    }
    delete this._registry[key];
  }

  getSidebar(key: any): SidebarComponent | any {
    if (!this._registry[key]) {
      console.warn(`The sidebar with the key '${key}' doesn't exist in the registry.`);
      return;
    }
    return this._registry[key];
  }

  fold(key: any, value: boolean): void {
    if (!this._registry[key]) {
      console.error(`The sidebar with the key '${key}' doesn't exist in the registry.`);
      return;
    }
    this._onSidebarFolded.next(value);
  }

  unfold(key: any, value: boolean): void {
    if (!this._registry[key]) {
      console.warn(`The sidebar with the key '${key}' doesn't exist in the registry.`);
    }
    this._onSidebarUnfolded.next(value);
  }
}
