import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../shared/shared.module';
import { AppSidebarModule } from '../../../shared/components/sidebar/sidebar.module';
import { ContentModule } from '../components/content/content.module';
import { FooterModule } from '../components/footer/footer.module';
import { NavbarModule } from '../components/navbar/navbar.module';
import { AppToolbarModule } from '../components/toolbar/toolbar.module';
import { VerticalLayoutComponent } from './vertical.component';

@NgModule({
  declarations: [VerticalLayoutComponent],
  imports: [AppSidebarModule, AppToolbarModule, ContentModule, FooterModule, NavbarModule, RouterModule, SharedModule],
  exports: [VerticalLayoutComponent],
})
export class VerticalLayoutModule {}
