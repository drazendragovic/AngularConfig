import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MatchMediaService {
  activeMediaQuery: string;
  onMediaChange: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private _breakPointObserver: BreakpointObserver) {
    this.activeMediaQuery = '';
    this._init();
  }

  private _init(): void {
    this._breakPointObserver
      .observe([Breakpoints.Large, Breakpoints.Medium, Breakpoints.Small, '(min-width: 500px)'])
      .pipe(
        tap((value) => console.log(value)),
        distinctUntilChanged()
      )
      .subscribe(() => this.breakpointChanged());
  }

  breakpointChanged(): void {
    if (this._breakPointObserver.isMatched(Breakpoints.Large)) {
      this.activeMediaQuery = Breakpoints.Large;
      this.onMediaChange.next(this.activeMediaQuery);
    } else if (this._breakPointObserver.isMatched(Breakpoints.Medium)) {
      this.activeMediaQuery = Breakpoints.Medium;
      this.onMediaChange.next(this.activeMediaQuery);
    } else if (this._breakPointObserver.isMatched(Breakpoints.Small)) {
      this.activeMediaQuery = Breakpoints.Small;
      this.onMediaChange.next(this.activeMediaQuery);
    } else if (this._breakPointObserver.isMatched('(min-width: 500px)')) {
      this.activeMediaQuery = '(min-width: 500px)';
      this.onMediaChange.next(this.activeMediaQuery);
    }
  }
}
