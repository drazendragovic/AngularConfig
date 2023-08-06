import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NavigationService } from '../../../navigation.service';
import { NavigationItem } from '../../../../../models/navigation';

@Component({
  selector: 'app-vertical-spacer',
  templateUrl: './spacer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavVerticalSpacerComponent implements OnInit, OnDestroy {
  @HostBinding('class') classes = 'nav-spacer nav-link';
  @Input() item: NavigationItem;

  private _unsubscribeAll: Subject<void>;

  constructor(private _changeDetectorRef: ChangeDetectorRef, private _navigationService: NavigationService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    merge(
      this._navigationService.onNavigationItemAdded,
      this._navigationService.onNavigationItemUpdated,
      this._navigationService.onNavigationItemRemoved
    )
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this._changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
