import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClanRoutingModule } from './clan-routing.module';
import { ClanPretragaComponent } from './pages/clan-pretraga/clan-pretraga.component';
import { PageLayoutModule } from '../layout/page-layout.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClanPretragaTableComponent } from './components/pretraga/clan-pretraga-table/clan-pretraga-table.component';
import { ClanPretragaFilterComponent } from './components/pretraga/clan-pretraga-filter/clan-pretraga-filter.component';
import { ClanPodaciComponent } from './pages/clan-podaci/clan-podaci.component';
import { ClanPodaciTabsComponent } from './components/podaci/clan-podaci-tabs/clan-podaci-tabs.component';
import { ClanPodaciFormComponent } from './components/podaci/clan-podaci-form/clan-podaci-form.component';
import { ClanPodaciActionsComponent } from './components/podaci/clan-podaci-actions/clan-podaci-actions.component';
import { ClanPodaciEvidencijaUplataComponent } from './components/podaci/clan-podaci-evidencija-uplata/clan-podaci-evidencija-uplata.component';
import { NoviClanComponent } from './components/pretraga/novi-clan/novi-clan.component';
import { ClanPodaciMainComponent } from './components/podaci/clan-podaci-main/clan-podaci-main.component';
import { ClanFunkcijeMainComponent } from './components/podaci/clan-funkcije-main/clan-funkcije-main.component';
import { ClanOdborMainComponent } from './components/podaci/clan-odbor-main/clan-odbor-main.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ClanFunkcijeTableComponent } from './components/podaci/clan-funkcije-table/clan-funkcije-table.component';
import { ClanOdborTableComponent } from './components/podaci/clan-odbor-table/clan-odbor-table.component';
import { ClanIskaznicaComponent } from './pages/clan-iskaznica/clan-iskaznica.component';
import { ClanEmailFormComponent } from './components/podaci/clan-email-form/clan-email-form.component';
import { MultipleEmailFormComponent } from './components/pretraga/multiple-email-form/multiple-email-form.component';
import { ClanPovijestPromjenaComponent } from './components/podaci/clan-povijest-promjena/clan-povijest-promjena.component';
import { NovaUplataClanarineComponent } from './components/podaci/nova-uplata-clanarine/nova-uplata-clanarine.component';
import { KreirajUrediOdborComponent } from './components/podaci/kreiraj-uredi-odbor/kreiraj-uredi-odbor.component';
import { KreirajUrediFunkcijuComponent } from './components/podaci/kreiraj-uredi-funkciju/kreiraj-uredi-funkciju.component';
import { ClanNoviOdborComponent } from './components/podaci/clan-novi-odbor/clan-novi-odbor.component';
import { ClanNovaFunkcijaComponent } from './components/podaci/clan-nova-funkcija/clan-nova-funkcija.component';

@NgModule({
  declarations: [
    ClanEmailFormComponent,
    ClanFunkcijeMainComponent,
    ClanFunkcijeTableComponent,
    ClanIskaznicaComponent,
    ClanNovaFunkcijaComponent,
    ClanNoviOdborComponent,
    ClanOdborMainComponent,
    ClanOdborTableComponent,
    ClanPodaciActionsComponent,
    ClanPodaciComponent,
    ClanPodaciEvidencijaUplataComponent,
    ClanPodaciFormComponent,
    ClanPodaciMainComponent,
    ClanPodaciTabsComponent,
    ClanPovijestPromjenaComponent,
    ClanPretragaComponent,
    ClanPretragaFilterComponent,
    ClanPretragaTableComponent,
    KreirajUrediFunkcijuComponent,
    KreirajUrediOdborComponent,
    MultipleEmailFormComponent,
    NovaUplataClanarineComponent,
    NoviClanComponent,
  ],
  imports: [
    ButtonModule,
    ClanRoutingModule,
    CommonModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    FontAwesomeModule,
    FormlyModule,
    PageLayoutModule,
    ReactiveFormsModule,
    RouterModule,
    ScrollPanelModule,
    SharedModule,
    ToolbarModule,
  ],
  exports: [],
})
export class ClanModule {}
