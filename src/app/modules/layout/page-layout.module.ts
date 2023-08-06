import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from 'src/app/shared/shared.module';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PageBreadcrumbComponent } from './components/page-breadcrumb/page-breadcrumb.component';
import { UIFormsFormlyModule } from './components/formly-form/ui-forms-formly.module';
import { STableModule } from './components/table/s-table.module';
import { UITabsModule } from './components/tabs';

@NgModule({
  declarations: [PageBreadcrumbComponent, PageHeaderComponent],
  imports: [BreadcrumbModule, ButtonModule, FontAwesomeModule, SharedModule, STableModule, UIFormsFormlyModule, UITabsModule],
  exports: [PageBreadcrumbComponent, PageHeaderComponent, STableModule, UITabsModule],
})
export class PageLayoutModule {}
