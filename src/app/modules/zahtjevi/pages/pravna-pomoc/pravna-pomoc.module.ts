import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PravnaPomocRoutingModule } from './pravna-pomoc-routing.module';
import { PageLayoutModule } from 'src/app/modules/layout/page-layout.module';
import { PravnaPomocComponent } from './pravna-pomoc.component';

@NgModule({
  declarations: [PravnaPomocComponent],
  imports: [CommonModule, PageLayoutModule, PravnaPomocRoutingModule, RouterModule, SharedModule],
})
export class PravnaPomocModule {}
