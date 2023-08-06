import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PrimeIcons, MenuItem } from 'primeng/api';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ToolbarComponent implements OnInit {
  items: MenuItem[];
  userCircle = faUserCircle;

  constructor() {}

  ngOnInit() {
    this.items = [
      {
        label: 'Profil',
        icon: PrimeIcons.USER,
        routerLink: ['/clanovi/clan/1'],
      },
      {
        label: 'Odjava',
        icon: PrimeIcons.SIGN_OUT,
        command: () => {
          this.logout();
        },
      },
    ];
  }

  logout() {}
}
