import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { FondSolidarnostiRoutingModule } from './fond-solidarnosti-routing.module';
import { PageLayoutModule } from 'src/app/modules/layout/page-layout.module';
import { FondSolidarnostiComponent } from './fond-solidarnosti.component';
import { FondSolidarnostiTabsComponent } from '../../components/fond-solidarnosti/zahtjev/fond-solidarnosti-tabs/fond-solidarnosti-tabs.component';
import { FondSolidarnostiZahtjevMainComponent } from '../../components/fond-solidarnosti/zahtjev/fond-solidarnosti-zahtjev-main/fond-solidarnosti-zahtjev-main.component';
import { FondSolidarnostiZahtjevFormComponent } from '../../components/fond-solidarnosti/zahtjev/fond-solidarnosti-zahtjev-form/fond-solidarnosti-zahtjev-form.component';
import { FondSolidarnostiZahtjevPriloziComponent } from '../../components/fond-solidarnosti/zahtjev/fond-solidarnosti-zahtjev-prilozi/fond-solidarnosti-zahtjev-prilozi.component';
import { FondSolidarnostiPretragaMainComponent } from '../../components/fond-solidarnosti/pretraga/fond-solidarnosti-pretraga-main/fond-solidarnosti-pretraga-main.component';
import { FondSolidarnostiPretragaFormComponent } from '../../components/fond-solidarnosti/pretraga/fond-solidarnosti-pretraga-form/fond-solidarnosti-pretraga-form.component';
import { FondSolidarnostiPretragaTableComponent } from '../../components/fond-solidarnosti/pretraga/fond-solidarnosti-pretraga-table/fond-solidarnosti-pretraga-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormlyModule } from '@ngx-formly/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ToolbarModule } from 'primeng/toolbar';
import { ClanRoutingModule } from 'src/app/modules/clan/clan-routing.module';

@NgModule({
  declarations: [
    FondSolidarnostiComponent,
    FondSolidarnostiPretragaFormComponent,
    FondSolidarnostiPretragaMainComponent,
    FondSolidarnostiPretragaTableComponent,
    FondSolidarnostiTabsComponent,
    FondSolidarnostiZahtjevFormComponent,
    FondSolidarnostiZahtjevMainComponent,
    FondSolidarnostiZahtjevPriloziComponent,
  ],
  imports: [
    ButtonModule,
    ClanRoutingModule,
    CommonModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    FondSolidarnostiRoutingModule,
    FontAwesomeModule,
    FormlyModule,
    PageLayoutModule,
    ReactiveFormsModule,
    RouterModule,
    ScrollPanelModule,
    SharedModule,
    ToolbarModule,
  ],
})
export class FondSolidarnostiModule {}
