import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import { UIFormlyConfigurationBuilder, UIFormlyConfigurationParams } from 'src/app/modules/layout/components/formly-form';
import { FunkcijaLookupDataSourceFactory } from 'src/app/shared/services/lookup-data-sources/clan-data-sources';

export interface ClanarineFilter {
  clan?: string;
  podruznica?: string;
  uplataMjesec?: string;
  uplataGodina?: string;
}

@Component({
  selector: 'clanarine-filter',
  templateUrl: './clanarine-filter.component.html',
  styleUrls: ['./clanarine-filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ClanarineFilterComponent implements OnInit {
  formlyConfiguration!: UIFormlyConfigurationParams;
  model: ClanarineFilter = {};
  form = new FormGroup({});
  options: FormlyFormOptions = {};

  constructor(private funkcijaLookupDataSourceFactory: FunkcijaLookupDataSourceFactory) {}

  ngOnInit() {
    this.setupForm();
  }

  setupForm() {
    const filterBuilder = new UIFormlyConfigurationBuilder<ClanarineFilter>();
    filterBuilder.fieldGroup((fg) =>
      fg.className('formgrid panelgrid').fields((fields) =>
        fields
          .dropDown('clan', 'Član', (s) => s.dataSource(() => this.funkcijaLookupDataSourceFactory.instance()).className('col-3'))
          .dropDown('podruznica', 'Sindikalna podružnica', (s) =>
            s.dataSource(() => this.funkcijaLookupDataSourceFactory.instance()).className('col-3')
          )
          .dropDown('uplataMjesec', 'Mjesec', (s) => s.dataSource(() => this.funkcijaLookupDataSourceFactory.instance()).className('col-3'))
          .dropDown('uplataGodina', 'Godina', (s) => s.dataSource(() => this.funkcijaLookupDataSourceFactory.instance()).className('col-3'))
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
