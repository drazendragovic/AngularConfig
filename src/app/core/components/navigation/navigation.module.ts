import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { NavigationComponent } from './navigation.component';
import { NavVerticalItemComponent } from './vertical/components/item/item.component';
import { NavVerticalGroupComponent } from './vertical/components/group/group.component';
import { NavVerticalCollapsableComponent } from './vertical/components/collapsable/collapsable.component';
import { NavVerticalSpacerComponent } from './vertical/components/spacer/spacer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [ButtonModule, CommonModule, FontAwesomeModule, RouterModule],
  exports: [NavigationComponent],
  declarations: [
    NavigationComponent,
    NavVerticalCollapsableComponent,
    NavVerticalGroupComponent,
    NavVerticalItemComponent,
    NavVerticalSpacerComponent,
  ],
})
export class NavigationModule {}
