import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BackendRestService } from 'src/app/core/services/rest.service';
import { Clan } from 'src/app/modules/clan/models/clan';
import { FormState, UIFormlyConfigurationBuilder } from 'src/app/modules/layout/components/formly-form';
import { ChangeMessageService } from 'src/app/modules/layout/components/shared/services/change-message-service';
import { BaseFormComponent } from 'src/app/shared/components/base/base-form.component';
import { FunkcijaLookupDataSourceFactory } from 'src/app/shared/services/lookup-data-sources/clan-data-sources';
import { SindikatiBackendRest } from 'src/app/shared/services/sindikati/sindikati-backend-rest';

@Component({
  selector: 'fond-solidarnosti-pretraga-form',
  templateUrl: './fond-solidarnosti-pretraga-form.component.html',
  styleUrls: ['./fond-solidarnosti-pretraga-form.component.scss'],
  providers: [DialogService, ChangeMessageService],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FondSolidarnostiPretragaFormComponent extends BaseFormComponent<Clan.IFondSolidarnostiLookup> implements OnInit {
  @Input() clanId: string;

  constructor(
    protected route: ActivatedRoute,
    protected override backendRest: SindikatiBackendRest,
    protected backendRestService: BackendRestService,
    protected router: Router,
    protected override cdRef: ChangeDetectorRef,
    protected override messageService: MessageService,
    private funkcijaLookupDataSourceFactory: FunkcijaLookupDataSourceFactory
  ) {
    super(backendRest, messageService, Clan.ClanInfo, cdRef, route, router);
  }

  ngOnInit() {
    this.formState = FormState.New;
    this.createForm();
  }

  createForm() {
    const builder = new UIFormlyConfigurationBuilder<Clan.IFondSolidarnostiLookup>();
    builder
      .formState(this.formState)
      .fieldGroup((fg) =>
        fg
          .className('formgrid panelgrid')
          .fields((fields) =>
            fields
              .shortString('status', 'Status zahtjeva', (c) => c.className('col-12'))
              .shortString('clan', 'Član/OIB', (c) => c.className('col-12'))
          )
      );

    this.formlyConfiguration = builder.getConfiguration();
  }
}
