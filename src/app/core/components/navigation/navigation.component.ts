import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NavigationService } from './navigation.service';
import { SidebarService } from 'src/app/shared/components/sidebar/sidebar.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {
  @Input() layout = 'vertical';
  @Input() navigation: any;
  @Input() autoCollapse = true;

  private _unsubscribeAll: Subject<any>;
  @HostBinding('class.folded') public isSidebarFolded: boolean;
  @HostBinding('class.unfolded') public isSidebarUnfolded: boolean;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _navigationService: NavigationService,
    private _sidebarService: SidebarService
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.navigation = this.navigation || this._navigationService.getCurrentNavigation();

    this._sidebarService.onSidebarFolded.pipe(takeUntil(this._unsubscribeAll)).subscribe((folded) => {
      this.isSidebarFolded = folded;
    });
    this._sidebarService.onSidebarUnfolded.pipe(takeUntil(this._unsubscribeAll)).subscribe((unfolded) => {
      this.isSidebarUnfolded = unfolded;
    });

    this._navigationService.onNavigationChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
      this.navigation = this._navigationService.getCurrentNavigation();
      this._changeDetectorRef.markForCheck();
    });
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
}
