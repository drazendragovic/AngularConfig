import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClanarineComponent } from './clanarine.component';

const routes: Routes = [{ path: '', component: ClanarineComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClanarineRoutingModule {}
