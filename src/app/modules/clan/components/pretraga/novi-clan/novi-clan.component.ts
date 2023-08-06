import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BackendRestService } from 'src/app/core/services/rest.service';
import { BaseFormComponent } from 'src/app/shared/components/base/base-form.component';

import { SindikatiBackendRest } from 'src/app/shared/services/sindikati/sindikati-backend-rest';
import { Clan } from '../../../models/clan';
import { FunkcijaLookupDataSourceFactory } from 'src/app/shared/services/lookup-data-sources/clan-data-sources';
import { FormState, UIFormlyConfigurationBuilder } from 'src/app/modules/layout/components/formly-form';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'novi-clan',
  templateUrl: './novi-clan.component.html',
  styleUrls: ['./novi-clan.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NoviClanComponent extends BaseFormComponent<Clan.IClan> implements OnInit {
  constructor(
    protected route: ActivatedRoute,
    protected override backendRest: SindikatiBackendRest,
    protected backendRestService: BackendRestService,
    protected router: Router,
    protected override cdRef: ChangeDetectorRef,
    protected override messageService: MessageService,
    private funkcijaLookupDataSourceFactory: FunkcijaLookupDataSourceFactory,
    public ref: DynamicDialogRef
  ) {
    super(backendRest, messageService, Clan.ClanInfo, cdRef, route, router);
    super.dialogReference = ref;
  }

  ngOnInit() {
    this.formState = FormState.New;
    this.createForm();
  }

  createForm() {
    const builder = new UIFormlyConfigurationBuilder<Clan.IClan>();
    builder
      .formState(this.formState)
      .fieldGroup((fg) =>
        fg
          .className('formgrid panelgrid')
          .templateOption((o) => (o.disabled = true))
          .fields((fields) =>
            fields
              .shortString('ime', 'Ime', (c) => c.className('col-12'))
              .shortString('prezime', 'Prezime', (c) => c.className('col-12'))
              .date('datumRodjenja', 'Datum rođenja', (c) => c.className('col-12'))
              .shortString('oib', 'OIB', (c) => c.className('col-12'))
              .shortString('email', 'E-pošta', (c) => c.className('col-12'))
              .shortString('brojTelefona', 'Broj telefona', (c) => c.className('col-12'))
          )
      )
      .fieldGroup((fg) =>
        fg
          .className('formgrid panelgrid')
          .templateOption((o) => (o.disabled = true))
          .fields((fields) =>
            fields
              .dropDown('zupanijaNaziv', 'Županija', (s) =>
                s.className('col-12').dataSource(() => this.funkcijaLookupDataSourceFactory.instance())
              )
              .shortString('grad', 'Grad/Općina', (c) => c.className('col-8'))
              .shortString('postanskiBroj', 'Poštanski broj', (c) => c.className('col-4'))
              .shortString('ulica', 'Ulica', (c) => c.className('col-8'))
              .shortString('kucniBroj', 'Broj', (c) => c.className('col-4'))
              .dropDown('strucnaSpremaNaziv', 'Stručna sprema', (s) =>
                s.dataSource(() => this.funkcijaLookupDataSourceFactory.instance()).className('col-12')
              )
              .shortString('zvanje', 'Zvanje', (c) => c.className('col-12'))
              .dropDown('zanimanjeNaziv', 'Zanimanje', (s) =>
                s.dataSource(() => this.funkcijaLookupDataSourceFactory.instance()).className('col-12')
              )
          )
      )
      .fieldGroup((fg) =>
        fg
          .className('formgrid panelgrid')
          .templateOption((o) => (o.disabled = true))
          .fields((fields) =>
            fields
              .date('pocetakClanstava', 'Početak članstva', (c) => c.className('col-6'))
              .date('zavrsetakClanstava', 'Završetak članstva', (c) => c.className('col-6'))
              .dropDown('poslodavacNaziv', 'Poslodavac', (s) =>
                s.dataSource(() => this.funkcijaLookupDataSourceFactory.instance()).className('col-12')
              )
              .dropDown('podružnicaNaziv', 'Naziv podružnice', (s) =>
                s.dataSource(() => this.funkcijaLookupDataSourceFactory.instance()).className('col-12')
              )
              .dropDown('tijeloNaziv', 'Pripadnost tijelu', (s) =>
                s.dataSource(() => this.funkcijaLookupDataSourceFactory.instance()).className('col-12')
              )
          )
      );
    this.formlyConfiguration = builder.getConfiguration();
  }
}
