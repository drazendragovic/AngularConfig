import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { delay, filter, take, takeUntil } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { SidebarService } from 'src/app/shared/components/sidebar/sidebar.service';

@Component({
  selector: 'navbar-vertical',
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarVerticalComponent implements OnInit, OnDestroy {
  navigation: any;

  private _unsubscribeAll: Subject<void>;

  constructor(private _sidebarService: SidebarService, private _router: Router) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        if (this._sidebarService.getSidebar('navbar')) {
          this._sidebarService.getSidebar('navbar').fold();
        }
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  toggleSidebarFolded(): void {
    this._sidebarService.getSidebar('navbar').toggleSidebarFold();
  }
}
