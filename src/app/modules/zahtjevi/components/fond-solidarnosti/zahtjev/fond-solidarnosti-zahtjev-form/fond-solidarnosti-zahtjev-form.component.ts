import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { BackendRestService } from 'src/app/core/services/rest.service';
import { Clan } from 'src/app/modules/clan/models/clan';
import { FormState, FormlyKeyValue, UIFormlyConfigurationBuilder } from 'src/app/modules/layout/components/formly-form';
import { ChangeMessageService } from 'src/app/modules/layout/components/shared/services/change-message-service';
import { BaseFormComponent } from 'src/app/shared/components/base/base-form.component';
import { FunkcijaLookupDataSourceFactory } from 'src/app/shared/services/lookup-data-sources/clan-data-sources';
import { SindikatiBackendRest } from 'src/app/shared/services/sindikati/sindikati-backend-rest';

@Component({
  selector: 'fond-solidarnosti-zahtjev-form',
  templateUrl: './fond-solidarnosti-zahtjev-form.component.html',
  styleUrls: ['./fond-solidarnosti-zahtjev-form.component.scss'],
  providers: [DialogService, ChangeMessageService],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FondSolidarnostiZahtjevFormComponent extends BaseFormComponent<Clan.IZahtjevFondSolidarnosti> implements OnInit, OnDestroy {
  @Input() clanId;

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

    this.model = {
      ...this.model,
      izvanredniSlucaj: true,
      socijalnaUgrozenost: false,
      teskaBolest: false,
      smrtClana: false,
      invaliditet: false,
    };
  }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$$)).subscribe((params) => {
      this.clanId = params['id'];
      this.formState = FormState.New;
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
    const builder = new UIFormlyConfigurationBuilder<Clan.IZahtjevFondSolidarnosti>();
    builder
      .formState(this.formState)
      .fieldGroup((fg) =>
        fg
          .className('formgrid panelgrid')
          .fields((fields) => fields.shortString('iban', 'IBAN tekućeg računa/zaštićenog računa', (c) => c.className('col-12 mt-2')))
      )
      .fieldGroup((fg) =>
        fg
          .className('formgrid panelgrid')
          .label('Sredstva iz Fonda solidarnosti traže se zbog')
          .wrappers(['title'])
          .fields((fields) =>
            fields
              .checkbox('izvanredniSlucaj', 'materijalne pomoći u izvanrednim slučajevima (elementarne nepogode)', (c) =>
                c
                  .onChange(() => {
                    this.onSelectionChange('izvanredniSlucaj', this.model.izvanredniSlucaj);
                    this.createForm();
                    this.cdRef.detectChanges();
                  })
                  .expressionProperty('templateOptions.disabled', () => this.model.izvanredniSlucaj)
              )
              .checkbox('socijalnaUgrozenost', 'materijalne pomoći uslijed socijalne ugroženosti', (c) =>
                c
                  .onChange(() => {
                    this.onSelectionChange('socijalnaUgrozenost', this.model.socijalnaUgrozenost);
                    this.createForm();
                    this.cdRef.detectChanges();
                  })
                  .expressionProperty('templateOptions.disabled', () => this.model.socijalnaUgrozenost)
              )
              .checkbox('teskaBolest', 'materijalne pomoći u slučaju teške bolesti člana Sindikata', (c) =>
                c
                  .onChange(() => {
                    this.onSelectionChange('teskaBolest', this.model.teskaBolest);
                    this.createForm();
                    this.cdRef.detectChanges();
                  })
                  .expressionProperty('templateOptions.disabled', () => this.model.teskaBolest)
              )
              .checkbox('smrtClana', 'materijalne pomoći u slučaju smrti člana Sindikata', (c) =>
                c
                  .onChange(() => {
                    this.onSelectionChange('smrtClana', this.model.smrtClana);
                    this.createForm();
                    this.cdRef.detectChanges();
                  })
                  .expressionProperty('templateOptions.disabled', () => this.model.smrtClana)
              )
              .checkbox('invaliditet', 'materijalne pomoći u slučaju invaliditeta', (c) =>
                c
                  .onChange(() => {
                    this.onSelectionChange('invaliditet', this.model.invaliditet);
                    this.createForm();
                    this.cdRef.detectChanges();
                  })
                  .expressionProperty('templateOptions.disabled', () => this.model.invaliditet)
              )
          )
      );

    if (this.model.izvanredniSlucaj) {
      builder.formState(this.formState).fieldGroup((fg) =>
        fg
          .className('formgrid panelgrid opis')
          .label('Materijalna pomoć u izvanrednom slučaju (elementarna nepogoda)')
          .wrappers(['title'])
          .fields((fields) =>
            fields
              .date('izvanredniSlucajDatum', 'Datum slučaja', (c) => c.className('col-2'))
              .longString('izvanredniSlucajOpis', 'Opis događaja', (c) => c.rows(9).maxLength(1500).className('col-12'))
              .longString('izvanredniSlucajSteta', 'Opis štete', (c) => c.rows(7).maxLength(1500).className('col-12'))
          )
      );
    }

    if (this.model.socijalnaUgrozenost) {
      builder.formState(this.formState).fieldGroup((fg) =>
        fg
          .className('formgrid panelgrid opis')
          .label('Materijalna pomoć uslijed socijalne ugroženosti')
          .wrappers(['title'])
          .fields((fields) =>
            fields.longString(
              'socijalnaUgrozenostOpis',
              'Obrazloženje socijalnih prilika koje potvrđuju stanje zbog kojeg se traži pomoć',
              (c) => c.rows(21).maxLength(1500).className('col-12')
            )
          )
      );
    }

    if (this.model.invaliditet) {
      builder.formState(this.formState).fieldGroup((fg) =>
        fg
          .className('formgrid panelgrid opis')
          .label('Materijalna pomoć u slučaju invaliditeta')
          .wrappers(['title'])
          .fields((fields) =>
            fields
              .date('invaliditetNastanak', 'Datum nesretnog slučaja', (c) => c.className('col-2'))
              .longString('invaliditetDogadaj', 'Opis događaja (mjesto i način nastanka nesretnog slučaja))', (c) =>
                c.rows(4).maxLength(1500).className('col-12')
              )
              .longString('invaliditetPovreda', 'Opis povreda', (c) => c.rows(4).maxLength(1500).className('col-12'))
              .checkbox(
                'invaliditetBolest',
                'Da li je oštećenik prije ovog nesretnog slučaja-invaliditeta bolovao od neke teže bolesti',
                (c) =>
                  c.onChange(() => {
                    this.createForm();
                    this.cdRef.detectChanges();
                  })
              )
              .longString('invaliditetBolestOpis', 'Koje', (c) =>
                c.rows(1).maxLength(1500).remove(!this.model.invaliditetBolest).className('col-12')
              )
              .longString('invaliditetBolestLijecenje', 'Gdje se oštećenik lijeći i kod kojeg liječnika?', (c) =>
                c.rows(1).maxLength(1500).remove(!this.model.invaliditetBolest).className('col-12')
              )
          )
      );
    }

    if (this.model.teskaBolest) {
      builder.formState(this.formState).fieldGroup((fg) =>
        fg
          .className('formgrid panelgrid opis')
          .label('Materijalna pomoć u slučaju teške bolesti')
          .wrappers(['title'])
          .fields((fields) =>
            fields
              .longString('invaliditetPovreda', 'Opis bolesti', (c) => c.rows(12).maxLength(1500).className('col-12'))
              .longString('invaliditetBolestLijecenje', 'Gdje se oštećenik lijeći i kod kojeg liječnika?', (c) =>
                c.rows(1).maxLength(1500).className('col-12')
              )
          )
      );
    }

    if (this.model.smrtClana) {
      builder.formState(this.formState).fieldGroup((fg) =>
        fg
          .className('formgrid panelgrid opis')
          .label('Materijalna pomoć u slučaju smrti')
          .wrappers(['title'])
          .fields((fields) =>
            fields
              .date('invaliditetNastanak', 'Datum nesretnog slučaja', (c) => c.className('col-2'))
              .longString('invaliditetPovreda', 'Opis nesretnog slučaja', (c) => c.rows(9).maxLength(1500).className('col-12'))
              .checkbox('invaliditetBolest', 'Da li je oštećenik prije ovog nesretnog slučaja-smrti bolovao od neke teže bolesti', (c) =>
                c.onChange(() => {
                  this.createForm();
                  this.cdRef.detectChanges();
                })
              )
              .longString('invaliditetBolestOpis', 'Koje', (c) =>
                c.rows(1).maxLength(1500).remove(!this.model.invaliditetBolest).className('col-12')
              )
              .longString('invaliditetBolestLijecenje', 'Gdje se oštećenik lijećio i kod kojeg liječnika?', (c) =>
                c.rows(1).maxLength(1500).remove(!this.model.invaliditetBolest).className('col-12')
              )
          )
      );
    }

    this.formlyConfiguration = builder.getConfiguration();
  }

  private onSelectionChange(field: FormlyKeyValue<Clan.IZahtjevFondSolidarnosti, boolean>, value: boolean): void {
    if (!value) {
      return;
    }

    switch (field) {
      case 'izvanredniSlucaj':
        this.model = { ...this.model, socijalnaUgrozenost: false, teskaBolest: false, smrtClana: false, invaliditet: false };
        break;
      case 'socijalnaUgrozenost':
        this.model = { ...this.model, izvanredniSlucaj: false, teskaBolest: false, smrtClana: false, invaliditet: false };
        break;
      case 'teskaBolest':
        this.model = { ...this.model, izvanredniSlucaj: false, socijalnaUgrozenost: false, smrtClana: false, invaliditet: false };
        break;
      case 'smrtClana':
        this.model = { ...this.model, izvanredniSlucaj: false, socijalnaUgrozenost: false, teskaBolest: false, invaliditet: false };
        break;
      case 'invaliditet':
        this.model = { ...this.model, izvanredniSlucaj: false, socijalnaUgrozenost: false, teskaBolest: false, smrtClana: false };
        break;
    }
  }
}
