import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/components/base/base-form.component';
import { Clan } from '../../../models/clan';
import { Subject, takeUntil } from 'rxjs';
import { SindikatiBackendRest } from 'src/app/shared/services/sindikati/sindikati-backend-rest';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendRestService } from 'src/app/core/services/rest.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { FormState, UIFormlyConfigurationBuilder } from 'src/app/modules/layout/components/formly-form';
import { FunkcijaLookupDataSourceFactory } from 'src/app/shared/services/lookup-data-sources/clan-data-sources';
import { DialogService } from 'primeng/dynamicdialog';
import { ChangeMessageService } from 'src/app/modules/layout/components/shared/services/change-message-service';

@Component({
  selector: 'clan-podaci-form',
  templateUrl: './clan-podaci-form.component.html',
  styleUrls: ['./clan-podaci-form.component.scss'],
  providers: [DialogService, ChangeMessageService],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClanPodaciFormComponent extends BaseFormComponent<Clan.IClan> implements OnInit, OnDestroy {
  @Input() clanId: string;
  private destroy$$ = new Subject<void>();

  constructor(
    protected route: ActivatedRoute,
    protected override backendRest: SindikatiBackendRest,
    protected backendRestService: BackendRestService,
    protected router: Router,
    protected override cdRef: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    protected override messageService: MessageService,
    private funkcijaLookupDataSourceFactory: FunkcijaLookupDataSourceFactory
  ) {
    super(backendRest, messageService, Clan.ClanInfo, cdRef, route, router);
  }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$$)).subscribe((params) => {
      this.clanId = params['id'];
      this.formState = FormState.Edit;
      this.loadEntity();
      this.createForm();
    });
  }

  ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }

  loadEntity(): void {
    console.log('Load Entity');
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
              .dropDown('zupanijaNaziv', 'Županija', (s) =>
                s.className('col-12').dataSource(() => this.funkcijaLookupDataSourceFactory.instance())
              )
              .shortString('grad', 'Grad/Općina', (c) => c.className('col-8'))
              .shortString('postanskiBroj', 'Poštanski broj', (c) => c.className('col-4'))
              .shortString('ulica', 'Ulica', (c) => c.className('col-8'))
              .shortString('kucniBroj', 'Broj', (c) => c.className('col-4'))
          )
      )
      .fieldGroup((fg) =>
        fg
          .className('formgrid panelgrid')
          .templateOption((o) => (o.disabled = true))
          .fields((fields) =>
            fields
              .dropDown('strucnaSpremaNaziv', 'Stručna sprema', (s) =>
                s.dataSource(() => this.funkcijaLookupDataSourceFactory.instance()).className('col-12')
              )
              .shortString('zvanje', 'Zvanje', (c) => c.className('col-12'))
              .dropDown('zanimanjeNaziv', 'Zanimanje', (s) =>
                s.dataSource(() => this.funkcijaLookupDataSourceFactory.instance()).className('col-12')
              )
              .date('pocetakClanstava', 'Početak članstva', (c) => c.className('col-6'))
              .date('zavrsetakClanstava', 'Završetak članstva', (c) => c.className('col-6'))
              .dropDown('poslodavacNaziv', 'Poslodavac', (s) =>
                s.dataSource(() => this.funkcijaLookupDataSourceFactory.instance()).className('col-12')
              )
              .dropDown('podružnicaNaziv', 'Podružnica', (s) =>
                s.dataSource(() => this.funkcijaLookupDataSourceFactory.instance()).className('col-12')
              )
              .dropDown('tijeloNaziv', 'Pripadnost tijelu', (s) =>
                s.dataSource(() => this.funkcijaLookupDataSourceFactory.instance()).className('col-12')
              )
          )
      );
    this.formlyConfiguration = builder.getConfiguration();
  }

  deleteClan() {
    this.confirmationService.confirm({
      message: 'Želite li obrisati podatke o članu?',
      icon: 'pi pi-exclamation-triangle',
      key: 'clanDeleteCancelConfirmation',
      accept: () => this.deleteConfirmed(this.clanId),
      reject: (type: ConfirmEventType) => {
        this.messageService.add({ severity: 'error', summary: 'Brisanje člana', detail: 'Odustali ste od brisanja podataka o članu' });
      },
    });
  }

  private deleteConfirmed(clan: any): void {
    console.log(clan);
  }
}
