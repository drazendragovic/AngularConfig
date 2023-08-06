import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/components/base/base-form.component';
import { Clan } from '../../../models/clan';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { BackendRestService } from 'src/app/core/services/rest.service';
import { FormState, UIFormlyConfigurationBuilder } from 'src/app/modules/layout/components/formly-form';
import { FunkcijaLookupDataSourceFactory } from 'src/app/shared/services/lookup-data-sources/clan-data-sources';
import { SindikatiBackendRest } from 'src/app/shared/services/sindikati/sindikati-backend-rest';

@Component({
  selector: 'nova-uplata-clanarine',
  templateUrl: './nova-uplata-clanarine.component.html',
  styleUrls: ['./nova-uplata-clanarine.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NovaUplataClanarineComponent extends BaseFormComponent<Clan.IUplataClanarine> implements OnInit {
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
    const builder = new UIFormlyConfigurationBuilder<Clan.IUplataClanarine>();
    builder.formState(this.formState).fieldGroup((fg) =>
      fg.className('formgrid panelgrid').fields((fields) =>
        fields
          .dropDown('evidencija', 'Evidencija uplate', (s) =>
            s.className('col-12').dataSource(() => this.funkcijaLookupDataSourceFactory.instance())
          )
          .shortString('mjesec', 'Mjesec', (c) => c.className('col-6'))
          .shortString('godina', 'Godina', (c) => c.className('col-6'))
      )
    );
    this.formlyConfiguration = builder.getConfiguration();
  }
}
