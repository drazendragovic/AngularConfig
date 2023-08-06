import { NgModule } from '@angular/core';
import { ClanModule } from './clan/clan.module';
import { ClanarineModule } from './clanarine/clanarine.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SifarniciModule } from './sifarnici/sifarnici.module';
import { ZahtjeviModule } from './zahtjevi/zahtjevi.module';
import { PageLayoutModule } from './layout/page-layout.module';

@NgModule({
  imports: [ClanarineModule, ClanModule, DashboardModule, PageLayoutModule, SifarniciModule, ZahtjeviModule],
  exports: [],
})
export class ModulesModule {}
