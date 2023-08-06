import { NgModule } from '@angular/core';

import { NavbarComponent } from './navbar.component';
import { NavbarVerticalModule } from './vertical/vertical.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [NavbarVerticalModule],
  exports: [NavbarComponent],
})
export class NavbarModule {}
