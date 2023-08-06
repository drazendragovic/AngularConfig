import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PozajmicaComponent } from './pozajmica.component';

const routes: Routes = [{ path: '', component: PozajmicaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PozajmicaRoutingModule {}
