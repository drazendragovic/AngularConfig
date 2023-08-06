import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { AdDirective, DynamicHostComponent } from './dynamic-host.component';

@NgModule({
  declarations: [AdDirective, DynamicHostComponent],
  imports: [CommonModule, TabViewModule],
  exports: [DynamicHostComponent],
})
export class SharedLayoutModule {}
