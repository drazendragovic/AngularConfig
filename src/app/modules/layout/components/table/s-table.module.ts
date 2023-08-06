import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { IconColumnComponent } from './components/custom-columns/icon-column';
import { STableComponent } from './components/s-table/s-table.component';
import { SharedLayoutModule } from '../shared/shared-layout.module';

@NgModule({
  declarations: [IconColumnComponent, STableComponent],
  imports: [ButtonModule, CommonModule, SharedLayoutModule, TableModule, TooltipModule],
  exports: [IconColumnComponent, STableComponent],
})
export class STableModule {}
