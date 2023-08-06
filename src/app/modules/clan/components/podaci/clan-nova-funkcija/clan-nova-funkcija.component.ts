import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { BackendRestService } from 'src/app/core/services/rest.service';
import { FormState, UIFormlyConfigurationBuilder } from 'src/app/modules/layout/components/formly-form';
import { FunkcijaLookupDataSourceFactory } from 'src/app/shared/services/lookup-data-sources/clan-data-sources';
import { SindikatiBackendRest } from 'src/app/shared/services/sindikati/sindikati-backend-rest';
import { Clan } from '../../../models/clan';
import { BaseFormComponent } from 'src/app/shared/components/base/base-form.component';

@Component({
  selector: 'clan-nova-funkcija',
  templateUrl: './clan-nova-funkcija.component.html',
  styleUrls: ['./clan-nova-funkcija.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ClanNovaFunkcijaComponent extends BaseFormComponent<Clan.IFunkcija> implements OnInit {
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
    const builder = new UIFormlyConfigurationBuilder<Clan.IFunkcija>();
    builder
      .formState(this.formState)
      .fieldGroup((fg) =>
        fg.className('formgrid panelgrid').fields((fields) =>
          fields
            .dropDown('poslodavac', 'Poslodavac', (s) =>
              s.dataSource(() => this.funkcijaLookupDataSourceFactory.instance()).className('col-12')
            )
            .dropDown('podruznica', 'Podružnica', (s) =>
              s.dataSource(() => this.funkcijaLookupDataSourceFactory.instance()).className('col-12')
            )
            .dropDown('funkcija', 'Funkcija', (s) =>
              s.dataSource(() => this.funkcijaLookupDataSourceFactory.instance()).className('col-12')
            )
        )
      )
      .fieldGroup((fg) =>
        fg
          .className('formgrid panelgrid')
          .label('Trajanje mandata')
          .wrappers(['title'])
          .fields((fields) =>
            fields
              .dropDown('pocetakMjesec', 'Početak mjesec', (s) =>
                s.dataSource(() => this.funkcijaLookupDataSourceFactory.instance()).className('col-6')
              )
              .dropDown('zavrsetakMjesec', 'Završetak mjesec', (s) =>
                s.dataSource(() => this.funkcijaLookupDataSourceFactory.instance()).className('col-6')
              )
              .dropDown('pocetakGodina', 'Početak godina', (s) =>
                s.dataSource(() => this.funkcijaLookupDataSourceFactory.instance()).className('col-6')
              )
              .dropDown('zavrsetakGodina', 'Završetak godina', (s) =>
                s.dataSource(() => this.funkcijaLookupDataSourceFactory.instance()).className('col-6')
              )
          )
      );
    this.formlyConfiguration = builder.getConfiguration();
  }
}
