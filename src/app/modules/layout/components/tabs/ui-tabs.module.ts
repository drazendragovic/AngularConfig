import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UITabsComponent } from './components/ui-tabs/ui-tabs.component';
import { TabViewModule } from 'primeng/tabview';
import { SharedLayoutModule } from '../shared/shared-layout.module';

@NgModule({
  declarations: [UITabsComponent],
  imports: [CommonModule, SharedLayoutModule, TabViewModule],
  exports: [UITabsComponent],
})
export class UITabsModule {}
