import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { UITabsComponent, UITabsConfigurationBuilder } from 'src/app/modules/layout/components/tabs';
import { UITabsConfigurationParams } from 'src/app/modules/layout/components/tabs/interfaces/uITabsConfigurationParams';
import { ClanPodaciMainComponent } from '../clan-podaci-main/clan-podaci-main.component';
import { ClanFunkcijeMainComponent } from '../clan-funkcije-main/clan-funkcije-main.component';
import { ClanOdborMainComponent } from '../clan-odbor-main/clan-odbor-main.component';

@Component({
  selector: 'clan-podaci-tabs',
  templateUrl: './clan-podaci-tabs.component.html',
  styleUrls: ['./clan-podaci-tabs.component.scss'],
})
export class ClanPodaciTabsComponent implements OnInit {
  @ViewChild(UITabsComponent) tabsComponent: UITabsComponent;
  @Input() clanID: string;
  tabsConfiguration!: UITabsConfigurationParams;
  public podaciInstance: ClanPodaciMainComponent;
  public funkcijeInstance: ClanFunkcijeMainComponent;
  public odborInstance: ClanOdborMainComponent;

  constructor(protected cdRef?: ChangeDetectorRef) {}

  ngOnInit() {
    this.tabBuilder();
  }

  public tabBuilder(): void {
    const tabBuilder = new UITabsConfigurationBuilder();
    tabBuilder
      .initialTabIndex(0)
      .addTab({
        label: 'OSOBNI PODACI',
        component: ClanPodaciMainComponent,
        initFn: (instance) => {
          instance.clanID = this.clanID;
          instance.activeindex = 0;
          this.podaciInstance = instance;
        },
        cache: () => false,
      })
      .addTab({
        label: 'FUNKCIJA',
        component: ClanFunkcijeMainComponent,
        initFn: (instance) => {
          instance.clanID = this.clanID;
          instance.activeindex = 1;
          this.funkcijeInstance = instance;
        },
        cache: () => false,
      })
      .addTab({
        label: 'ODBOR',
        component: ClanOdborMainComponent,
        initFn: (instance) => {
          instance.clanID = this.clanID;
          instance.activeindex = 2;
          this.odborInstance = instance;
        },
        cache: () => false,
      });

    this.tabsConfiguration = tabBuilder.getConfiguration();
  }
}
