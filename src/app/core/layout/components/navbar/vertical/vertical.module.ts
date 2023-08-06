import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from 'primeng/button';

import { NavbarVerticalComponent } from './vertical.component';
import { NavigationModule } from 'src/app/core/components/navigation/navigation.module';

@NgModule({
  declarations: [NavbarVerticalComponent],
  imports: [ButtonModule, FontAwesomeModule, NavigationModule],
  exports: [NavbarVerticalComponent],
})
export class NavbarVerticalModule {}
