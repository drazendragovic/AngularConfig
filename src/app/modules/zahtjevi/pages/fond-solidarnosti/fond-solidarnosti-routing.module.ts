import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FondSolidarnostiComponent } from './fond-solidarnosti.component';

const routes: Routes = [{ path: '', component: FondSolidarnostiComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FondSolidarnostiRoutingModule {}
