import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PravnaPomocComponent } from './pravna-pomoc.component';

const routes: Routes = [{ path: '', component: PravnaPomocComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PravnaPomocRoutingModule {}
