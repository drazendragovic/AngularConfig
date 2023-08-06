import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { navigation } from 'src/app/shared/navigation/navigation';

@Component({
  selector: 'app-horizontal-layout',
  templateUrl: './horizontal.component.html',
  styleUrls: ['./horizontal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HorizontalLayoutComponent {
  navigation: any;

  private _unsubscribeAll: Subject<void>;

  constructor() {
    this.navigation = navigation;
  }
}
