import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { NavigationService } from './core/components/navigation/navigation.service';
import { navigation } from './shared/navigation/navigation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'sindikati-web';
  navigation: any;

  constructor(private primengConfig: PrimeNGConfig, private _navigationService: NavigationService) {
    this.navigation = navigation;
    this._navigationService.register('main', this.navigation);
    this._navigationService.setCurrentNavigation('main');
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
