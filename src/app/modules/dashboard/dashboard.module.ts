import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { SharedModule } from 'src/app/shared/shared.module';
import { PageLayoutModule } from '../layout/page-layout.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CardModule, CommonModule, DashboardRoutingModule, PageLayoutModule, RouterModule, SharedModule],
  exports: [DashboardComponent],
})
export class DashboardModule {}
