import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ToolbarComponent } from './toolbar.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [ButtonModule, FontAwesomeModule, MenuModule, RouterModule, SharedModule, ToolbarModule],
  exports: [ToolbarComponent],
})
export class AppToolbarModule {}
