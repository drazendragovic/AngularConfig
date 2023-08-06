import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIToolbarComponent } from './ui-toolbar/ui-toolbar.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import { CoreUIModule } from '@ngx-ui/core-ui';
import { SplitButtonModule } from 'primeng/splitbutton';

@NgModule({
  imports: [CommonModule, CoreUIModule, ToolbarModule, ButtonModule, TooltipModule, RippleModule, SplitButtonModule],
  declarations: [UIToolbarComponent],
  exports: [UIToolbarComponent],
})
export class UIToolbarModule {}
