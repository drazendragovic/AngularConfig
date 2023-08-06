import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { UIElasticFilterComponent } from './ui-elastic-filter/ui-elastic-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { UIFormsFormlyModule } from '../formly-form';

@NgModule({
  declarations: [UIElasticFilterComponent],
  exports: [UIElasticFilterComponent],
  imports: [CommonModule, ReactiveFormsModule, FormlyModule, UIFormsFormlyModule, ButtonModule, TooltipModule, ToolbarModule],
})
export class UIElasticModule {}
