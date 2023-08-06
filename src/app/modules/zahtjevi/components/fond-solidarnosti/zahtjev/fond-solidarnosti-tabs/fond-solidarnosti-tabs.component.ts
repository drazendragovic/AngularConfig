import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { UITabsComponent, UITabsConfigurationBuilder } from 'src/app/modules/layout/components/tabs';
import { UITabsConfigurationParams } from 'src/app/modules/layout/components/tabs/interfaces/uITabsConfigurationParams';
import { FondSolidarnostiZahtjevMainComponent } from '../fond-solidarnosti-zahtjev-main/fond-solidarnosti-zahtjev-main.component';
import { FondSolidarnostiPretragaMainComponent } from '../../pretraga/fond-solidarnosti-pretraga-main/fond-solidarnosti-pretraga-main.component';

@Component({
  selector: 'fond-solidarnosti-tabs',
  templateUrl: './fond-solidarnosti-tabs.component.html',
  styleUrls: ['./fond-solidarnosti-tabs.component.scss'],
})
export class FondSolidarnostiTabsComponent implements OnInit {
  @ViewChild(UITabsComponent) tabsComponent: UITabsComponent;
  @Input() clanID: string;
  tabsConfiguration!: UITabsConfigurationParams;

  constructor(protected cdRef?: ChangeDetectorRef) {}

  ngOnInit() {
    this.tabBuilder();
  }

  public tabBuilder(): void {
    const tabBuilder = new UITabsConfigurationBuilder();
    tabBuilder
      .initialTabIndex(0)
      .addTab({
        label: 'PRETRAGA',
        component: FondSolidarnostiPretragaMainComponent,
        initFn: (instance) => {
          instance.clanID = this.clanID;
        },
        cache: () => false,
      })
      .addTab({
        label: 'ZAHTJEV',
        component: FondSolidarnostiZahtjevMainComponent,
        initFn: (instance) => {
          instance.clanID = this.clanID;
        },
        cache: () => false,
      });

    this.tabsConfiguration = tabBuilder.getConfiguration();
  }
}
