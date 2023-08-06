import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SifrarniciComponent } from './pages/sifrarnici/sifrarnici.component';

const routes: Routes = [
  {
    path: '',
    component: SifrarniciComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SifarniciRoutingModule {}
