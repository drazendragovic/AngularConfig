import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PozajmicaRoutingModule } from './pozajmica-routing.module';
import { PageLayoutModule } from 'src/app/modules/layout/page-layout.module';
import { PozajmicaComponent } from './pozajmica.component';
import { PozajmicaZahtjevComponent } from './components/pozajmica-zahtjev/pozajmica-zahtjev.component';
import { PozajmicaPretragaComponent } from './components/pozajmica-pretraga/pozajmica-pretraga.component';
import { TabViewModule } from 'primeng/tabview';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PozajmicaPretragaTableComponent } from '../../components/pozajmica/pretraga/pozajmica-pretraga-table/pozajmica-pretraga-table.component';
import { PozajmicaPretragaMainComponent } from '../../components/pozajmica/pretraga/pozajmica-pretraga-main/pozajmica-pretraga-main.component';
import { PozajmicaPretragaFormComponent } from '../../components/pozajmica/pretraga/pozajmica-pretraga-form/pozajmica-pretraga-form.component';
import { PozajmicaZahtjevTabsComponent } from '../../components/pozajmica/zahtjev/pozajmica-zahtjev-tabs/pozajmica-zahtjev-tabs.component';
import { PozajmicaZahtjevFormComponent } from '../../components/pozajmica/zahtjev/pozajmica-zahtjev-form/pozajmica-zahtjev-form.component';
import { PozajmicaZahtjevMainComponent } from '../../components/pozajmica/zahtjev/pozajmica-zahtjev-main/pozajmica-zahtjev-main.component';
import { PozajmicaZahtjevPriloziComponent } from '../../components/pozajmica/zahtjev/pozajmica-zahtjev-prilozi/pozajmica-zahtjev-prilozi.component';

@NgModule({
  declarations: [
    PozajmicaComponent,
    //
    PozajmicaPretragaComponent,
    PozajmicaZahtjevComponent,
    //
    PozajmicaPretragaFormComponent,
    PozajmicaPretragaMainComponent,
    PozajmicaPretragaTableComponent,
    PozajmicaZahtjevTabsComponent,
    PozajmicaZahtjevPriloziComponent,
    PozajmicaZahtjevMainComponent,
    PozajmicaZahtjevFormComponent,
  ],
  imports: [
    ButtonModule,
    CommonModule,
    ConfirmDialogModule,
    FontAwesomeModule,
    FormlyModule,
    PageLayoutModule,
    PozajmicaRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    TabViewModule,
  ],
})
export class PozajmicaModule {}
