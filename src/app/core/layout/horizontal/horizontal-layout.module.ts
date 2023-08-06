import { NgModule } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';

import { HorizontalLayoutComponent } from './horizontal.component';
import { AppToolbarModule } from '../components/toolbar/toolbar.module';
import { NavbarModule } from '../components/navbar/navbar.module';
import { ContentModule } from '../components/content/content.module';
import { FooterModule } from '../components/footer/footer.module';
import { AppSidebarModule } from 'src/app/shared/components/sidebar/sidebar.module';

@NgModule({
  declarations: [HorizontalLayoutComponent],
  imports: [AppSidebarModule, AppToolbarModule, ContentModule, FooterModule, NavbarModule, SidebarModule],
  exports: [HorizontalLayoutComponent],
})
export class HorizontalLayoutModule {}
