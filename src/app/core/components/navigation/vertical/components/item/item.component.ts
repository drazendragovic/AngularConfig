import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationItem } from '../../../../../models/navigation';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NavigationService } from '../../../navigation.service';
import { IsActiveMatchOptions } from '@angular/router';
import { UtilsService } from 'src/app/core/utils/utils.service';

@Component({
  selector: 'app-vertical-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavVerticalItemComponent implements OnInit, OnDestroy {
  @HostBinding('class') classes = 'nav-link';
  @Input() item: NavigationItem | any;
  isActiveMatchOptions: IsActiveMatchOptions;
  private _unsubscribeAll: Subject<void>;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _navigationService: NavigationService,
    private _utilsService: UtilsService
  ) {
    this.isActiveMatchOptions = this._utilsService.subsetMatchOptions;
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.isActiveMatchOptions =
      this.item.isActiveMatchOptions ?? this.item.exactMatch ? this._utilsService.exactMatchOptions : this._utilsService.subsetMatchOptions;

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
