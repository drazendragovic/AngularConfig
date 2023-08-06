import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/components/base/base-form.component';
import { Sifarnik } from '../../model/sifrarnik';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BackendRestService } from 'src/app/core/services/rest.service';
import { FormState, UIFormlyConfigurationBuilder } from 'src/app/modules/layout/components/formly-form';
import { Clan } from 'src/app/shared/models/clan.model';
import { FunkcijaLookupDataSourceFactory } from 'src/app/shared/services/lookup-data-sources/clan-data-sources';
import { SindikatiBackendRest } from 'src/app/shared/services/sindikati/sindikati-backend-rest';

@Component({
  selector: 'nova-sifra',
  templateUrl: './nova-sifra.component.html',
  styleUrls: ['./nova-sifra.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NovaSifraComponent extends BaseFormComponent<Sifarnik.ISifra> implements OnInit {
  sifraId: string;

  constructor(
    protected route: ActivatedRoute,
    protected override backendRest: SindikatiBackendRest,
    protected backendRestService: BackendRestService,
    protected router: Router,
    protected override cdRef: ChangeDetectorRef,
    protected override messageService: MessageService,
    private funkcijaLookupDataSourceFactory: FunkcijaLookupDataSourceFactory,
    private dialogConfig: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {
    super(backendRest, messageService, Sifarnik.ClanStatusInfo, cdRef, route, router);
    super.dialogReference = ref;
    this.sifraId = this.dialogConfig.data.sifraId;
  }

  ngOnInit() {
    this.formState = FormState.New;
    this.entity = this.getStructureInfo(this.sifraId);
    this.createForm();
  }

  createForm() {
    const builder = new UIFormlyConfigurationBuilder<Sifarnik.ISifra>();
    builder.formState(this.formState).fieldGroup((fg) =>
      fg.className('formgrid panelgrid').fields((fields) =>
        fields
          .shortString('naziv', 'Naziv', (c) => c.className('col-12'))
          .integer('sifra', 'Šifra', (c) =>
            c
              .className('col-12')
              .remove(this.sifraId !== 'poslodavac')
              .remove(this.sifraId !== 'podruznica')
              .remove(this.sifraId !== 'tijelo')
              .remove(this.sifraId !== 'zanimanje')
              .remove(this.sifraId !== 'zupanija')
          )
          .shortString('registarskiBroj', 'Registarski broj', (c) => c.className('col-12').remove(this.sifraId !== 'podruznica'))
      )
    );

    if (this.sifraId === 'poslodavac') {
      builder.fieldGroup((fg) =>
        fg.className('formgrid panelgrid').fields((fields) =>
          fields
            .shortString('oib', 'OIB', (c) => c.className('col-8'))
            .dropDown('zupanija', 'Županija', (s) =>
              s.className('col-12').dataSource(() => this.funkcijaLookupDataSourceFactory.instance())
            )
            .shortString('grad', 'Grad/Općina', (c) => c.className('col-8'))
            .shortString('postanskiBroj', 'Poštanski broj', (c) => c.className('col-4'))
            .shortString('ulica', 'Ulica', (c) => c.className('col-8'))
            .shortString('kucniBroj', 'Broj', (c) => c.className('col-4'))
            .shortString('email', 'E-pošta', (c) => c.className('col-12'))
            .shortString('kontakt', 'Broj telefona', (c) => c.className('col-12'))
        )
      );
    }

    builder
      .formState(this.formState)
      .fieldGroup((fg) =>
        fg.className('formgrid panelgrid').fields((fields) => fields.boolSwitch('aktivan', 'Aktivna', (c) => c.className('col-12')))
      );

    this.formlyConfiguration = builder.getConfiguration();
  }
}
