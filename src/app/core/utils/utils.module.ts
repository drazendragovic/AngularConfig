import { NgModule } from '@angular/core';
import { UtilsService } from './utils.service';

@NgModule({
  imports: [],
  providers: [UtilsService],
  exports: [],
})
export class UtilsModule {
  constructor(private _utilsService: UtilsService) {}
}
