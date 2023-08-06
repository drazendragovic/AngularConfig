import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationItem } from '../../../../../models/navigation';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NavigationService } from '../../../navigation.service';

@Component({
  selector: 'app-vertical-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavVerticalGroupComponent implements OnInit, OnDestroy {
  @HostBinding('class') classes = 'nav-group nav-link';
  @Input() autoCollapse: boolean;
  @Input() item: NavigationItem | any;

  private _unsubscribeAll: Subject<void>;

  constructor(private _changeDetectorRef: ChangeDetectorRef, private _navigationService: NavigationService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
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
