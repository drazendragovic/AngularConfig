import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-page-breadcrumb',
  templateUrl: './page-breadcrumb.component.html',
})
export class PageBreadcrumbComponent {
  items: MenuItem[];
  constructor(private location: Location, public router: Router) {}

  backClicked() {
    if (this.router.url !== '/') {
      this.location.back();
    }
  }
}
