import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/components/base/base-form.component';
import { Clan } from '../../../models/clan';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { BackendRestService } from 'src/app/core/services/rest.service';
import { FunkcijaLookupDataSourceFactory } from 'src/app/shared/services/lookup-data-sources/clan-data-sources';
import { SindikatiBackendRest } from 'src/app/shared/services/sindikati/sindikati-backend-rest';
import { FormState, UIFormlyConfigurationBuilder } from 'src/app/modules/layout/components/formly-form';

@Component({
  selector: 'clan-email-form',
  templateUrl: './clan-email-form.component.html',
  styleUrls: ['./clan-email-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ClanEmailFormComponent extends BaseFormComponent<Clan.IMail> implements OnInit {
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
    const builder = new UIFormlyConfigurationBuilder<Clan.IMail>();
    builder
      .formState(this.formState)
      .fieldGroup((fg) =>
        fg
          .className('formgrid panelgrid')
          .fields((fields) =>
            fields
              .shortString('predmet', 'Predmet', (c) => c.className('col-12'))
              .longString('sadrzaj', 'Sadržaj', (c) => c.rows(8).maxLength(1500).className('col-12'))
          )
      );

    this.formlyConfiguration = builder.getConfiguration();
  }
}
