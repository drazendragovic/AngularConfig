import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: { breadcrumb: '', disable: true },
  },
  {
    path: 'clanovi',
    loadChildren: () => import('./modules/clan/clan.module').then((m) => m.ClanModule),
    data: { breadcrumb: { label: 'članovi', disable: true } },
  },
  {
    path: 'zahtjevi',
    children: [
      {
        path: 'uzajamna-pomoc',
        loadChildren: () => import('./modules/zahtjevi/pages/pozajmica/pozajmica.module').then((m) => m.PozajmicaModule),
      },
      {
        path: 'fond-solidarnosti',
        loadChildren: () =>
          import('./modules/zahtjevi/pages/fond-solidarnosti/fond-solidarnosti.module').then((m) => m.FondSolidarnostiModule),
      },
      {
        path: 'pravna-pomoc',
        loadChildren: () => import('./modules/zahtjevi/pages/pravna-pomoc/pravna-pomoc.module').then((m) => m.PravnaPomocModule),
      },
    ],
  },
  {
    path: 'clanarine',
    loadChildren: () => import('./modules/clanarine/clanarine.module').then((m) => m.ClanarineModule),
    data: { breadcrumb: { label: 'članarine', disable: true } },
  },
  {
    path: 'sifarnici',
    loadChildren: () => import('./modules/sifarnici/sifarnici.module').then((m) => m.SifarniciModule),
    data: { breadcrumb: { label: 'Šifarnici', disable: true } },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
