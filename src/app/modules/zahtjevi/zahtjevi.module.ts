import { NgModule } from '@angular/core';
import { FondSolidarnostiModule } from './pages/fond-solidarnosti/fond-solidarnosti.module';
import { PozajmicaModule } from './pages/pozajmica/pozajmica.module';
import { PravnaPomocModule } from './pages/pravna-pomoc/pravna-pomoc.module';
import { PageLayoutModule } from '../layout/page-layout.module';

@NgModule({
  imports: [FondSolidarnostiModule, PozajmicaModule, PravnaPomocModule],
  exports: [FondSolidarnostiModule, PozajmicaModule, PravnaPomocModule],
})
export class ZahtjeviModule {}
