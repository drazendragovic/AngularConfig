import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClanarineComponent } from './clanarine.component';
import { ClanarineRoutingModule } from './clanarine-routing.module';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { PageLayoutModule } from '../layout/page-layout.module';
import { ClanarineFilterComponent } from './components/clanarine-filter/clanarine-filter.component';
import { ClanarineTableComponent } from './components/clanarine-table/clanarine-table.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ClanarineComponent, ClanarineFilterComponent, ClanarineTableComponent],
  imports: [
    ButtonModule,
    ClanarineRoutingModule,
    CommonModule,
    FontAwesomeModule,
    FormlyModule,
    PageLayoutModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
  exports: [ClanarineComponent],
})
export class ClanarineModule {}
