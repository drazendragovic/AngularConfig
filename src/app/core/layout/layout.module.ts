import { NgModule } from '@angular/core';
import { HorizontalLayoutModule } from './horizontal/horizontal-layout.module';

@NgModule({
  imports: [HorizontalLayoutModule],
  exports: [HorizontalLayoutModule],
})
export class AppLayoutModule {}
