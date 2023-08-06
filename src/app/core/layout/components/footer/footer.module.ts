import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

import { FooterComponent } from './footer.component';
import { SharedModule } from '../../../../../app/shared/shared.module';

@NgModule({
  declarations: [FooterComponent],
  imports: [ButtonModule, RouterModule, SharedModule, ToolbarModule],
  exports: [FooterComponent],
})
export class FooterModule {}
