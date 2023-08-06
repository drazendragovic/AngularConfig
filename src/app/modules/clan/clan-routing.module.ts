import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClanPretragaComponent } from './pages/clan-pretraga/clan-pretraga.component';
import { ClanIskaznicaComponent } from './pages/clan-iskaznica/clan-iskaznica.component';
import { ClanPodaciComponent } from './pages/clan-podaci/clan-podaci.component';

const routes: Routes = [
  { path: 'pretraga', component: ClanPretragaComponent },
  { path: 'clan/:id', component: ClanPodaciComponent },
  { path: 'iskaznica', component: ClanIskaznicaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClanRoutingModule {}
