import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import { UIFormlyConfigurationBuilder, UIFormlyConfigurationParams } from 'src/app/modules/layout/components/formly-form';
import { FunkcijaLookupDataSourceFactory } from 'src/app/shared/services/lookup-data-sources/clan-data-sources';

export interface PretragaClanFilter {
  ime?: string;
  prezime?: string;
  oib?: string;
  zupPoslodavca?: string;
  poslodavac?: string;
  podruznica?: string;
  zupanija?: string;
  status?: string;
  strucnaSprema?: string;
  zanimanje?: string;
  odbor?: string;
  regBroj?: string;
  funkcija?: string;
  funkcijaAktivna?: boolean;
  uplataOdaberi?: string;
  uplataMjesec?: string;
  uplataGodina?: string;
  proba?: string;
  probaAuto?: string;
}

@Component({
  selector: 'clan-pretraga-filter',
  templateUrl: './clan-pretraga-filter.component.html',
  styleUrls: ['./clan-pretraga-filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ClanPretragaFilterComponent implements OnInit {
  formlyConfiguration!: UIFormlyConfigurationParams;
  model: PretragaClanFilter = {};
  form = new FormGroup({});
  options: FormlyFormOptions = {};

  constructor(private funkcijaLookupDataSourceFactory: FunkcijaLookupDataSourceFactory) {}

  ngOnInit() {
    this.setupForm();
  }

  private setupForm(): void {
    const filterBuilder = new UIFormlyConfigurationBuilder<PretragaClanFilter>();
    filterBuilder
      .fieldGroup((fg) =>
        fg
          .className('formgrid panelgrid')
          .label('Osobni podaci')
          .collapsed(false)
          .toggleable(false)
          .wrappers(['secondary'])
          .fields((fields) =>
            fields
              .shortString('ime', 'Ime', (c) => c.className('col-12'))
              .shortString('prezime', 'Prezime', (c) => c.className('col-12'))
              .shortString('oib', 'OIB', (c) => c.className('col-12'))
              .autoComplete('zupPoslodavca', 'Županija poslodavca', (s) =>
                s.dataSource(() => this.funkcijaLookupDataSourceFactory.instance()).className('col-12')
              )
              .autoComplete('poslodavac', 'Poslodavac', (s) =>
                s.dataSource(() => this.funkcijaLookupDataSourceFactory.instance()).className('col-12')
              )
              .autoComplete('podruznica', 'Podružnica', (s) =>
                s.dataSource(() => this.funkcijaLookupDataSourceFactory.instance()).className('col-12')
              )
          )
      )
      .fieldGroup((fg) =>
        fg
          .className('formgrid panelgrid')
          .label('Lokacija i zaposlenje')
          .collapsed(true)
          .toggleable(true)
          .wrappers(['secondary'])
          .fields((fields) =>
            fields
              .autoComplete('zupanija', 'Županija', (s) =>
                s.dataSource(() => this.funkcijaLookupDataSourceFactory.instance()).className('col-12')
              )
              .autoComplete('status', 'Status', (s) =>
                s.dataSource(() => this.funkcijaLookupDataSourceFactory.instance()).className('col-12')
              )
              .autoComplete('strucnaSprema', 'Stručna sprema', (s) =>
                s.dataSource(() => this.funkcijaLookupDataSourceFactory.instance()).className('col-12')
              )
              .autoComplete('zanimanje', 'Zanimanje', (s) =>
                s.dataSource(() => this.funkcijaLookupDataSourceFactory.instance()).className('col-12')
              )
              .autoComplete('odbor', 'Odbor', (s) =>
                s.dataSource(() => this.funkcijaLookupDataSourceFactory.instance()).className('col-12')
              )
              .shortString('regBroj', 'Registarski broj', (c) => c.className('col-12'))
          )
      )
      .fieldGroup((fg) =>
        fg
          .className('formgrid panelgrid')
          .label('Funkcije člana')
          .collapsed(true)
          .toggleable(true)
          .wrappers(['secondary'])
          .fields((fields) =>
            fields
              .autoComplete('funkcija', 'Funkcija u sindikatu', (s) =>
                s.dataSource(() => this.funkcijaLookupDataSourceFactory.instance()).className('col-12')
              )
              .checkbox('funkcijaAktivna', 'Prikaži aktivne funkcije')
          )
      )
      .fieldGroup((fg) =>
        fg
          .className('formgrid panelgrid')
          .label('Evidencija uplata')
          .collapsed(true)
          .toggleable(true)
          .wrappers(['secondary'])
          .fields((fields) =>
            fields
              .autoComplete('uplataOdaberi', 'Odaberi', (s) =>
                s.dataSource(() => this.funkcijaLookupDataSourceFactory.instance()).className('col-12')
              )
              .autoComplete('uplataMjesec', 'Mjesec', (s) =>
                s.dataSource(() => this.funkcijaLookupDataSourceFactory.instance()).className('col-12')
              )
              .autoComplete('uplataGodina', 'Godina', (s) =>
                s.dataSource(() => this.funkcijaLookupDataSourceFactory.instance()).className('col-12')
              )
          )
      );

    this.formlyConfiguration = filterBuilder.getConfiguration();
  }

  submit() {
    if (this.form.valid) {
      alert(JSON.stringify(this.model));
    }
  }
}
