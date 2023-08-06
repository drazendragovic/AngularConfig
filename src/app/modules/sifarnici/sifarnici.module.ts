import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SifarniciComponent } from './pages/sifarnici/sifarnici.component';
import { SifarniciRoutingModule } from './sifarnici-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SifarniciTableComponent } from './components/sifarnici-table/sifarnici-table.component';
import { PageLayoutModule } from '../layout/page-layout.module';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldInput } from '@ngx-formly/primeng/input';
import { FormlyFieldSelect } from '@ngx-formly/primeng/select';
import { TableModule } from 'primeng/table';
import { SifrarniciService } from './service/sifrarniciService';

// import { DialogModule } from 'primeng/dialog';
// import { DynamicDialogModule } from 'primeng/dynamicdialog';
// import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { FormsModule } from '@angular/forms';
import { NoviSifrarnikComponent } from './components/novi-sifrarnik/novi-sifrarnik/novi-sifrarnik.component';
import { FormlyFieldCheckbox } from '@ngx-formly/primeng/checkbox';
import { FormlyDatepickerModule } from '@ngx-formly/primeng/datepicker';
import { SifrarniciComponent } from './pages/sifrarnici/sifrarnici.component';
import { SifrarnikTableComponent } from './components/sifrarnik-table/sifrarnik-table.component';
import { NovaSifraComponent } from './components/nova-sifra/nova-sifra.component';
// import { ScrollerModule } from 'primeng/scroller';

// import { VirtualScrollerModule } from 'primeng/virtualscroller';
// import { ScrollTopModule } from 'primeng/scrolltop';

@NgModule({
  declarations: [
    NovaSifraComponent,
    NoviSifrarnikComponent,
    SifarniciComponent,
    SifrarniciComponent,
    SifrarnikTableComponent,
    SifarniciTableComponent,
  ],
  imports: [
    ButtonModule,
    CommonModule,
    ConfirmDialogModule,
    FontAwesomeModule,
    FormlyModule.forRoot({
      types: [
        { name: 'input', component: FormlyFieldInput },
        { name: 'select', component: FormlyFieldSelect },
        { name: 'checkbox', component: FormlyFieldCheckbox },
      ],
    }),
    FormlyDatepickerModule,
    PageLayoutModule,
    ReactiveFormsModule,
    RouterModule,
    ScrollPanelModule,
    SharedModule,
    SifarniciRoutingModule,
    TableModule,

    // DialogModule,
    FormsModule,
    // DynamicDialogModule,
    // ConfirmDialogModule,

    // VirtualScrollerModule,
    // ScrollerModule,
    // ScrollTopModule,
  ],
  exports: [],
  providers: [SifrarniciService],
})
export class SifarniciModule {}
