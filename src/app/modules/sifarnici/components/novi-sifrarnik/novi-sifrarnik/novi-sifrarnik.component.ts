import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SifrarniciService } from '../../../service/sifrarniciService';

@Component({
  selector: 'app-novi-sifrarnik',
  templateUrl: './novi-sifrarnik.component.html',
  styleUrls: ['./novi-sifrarnik.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NoviSifrarnikComponent implements OnInit {
  constructor(private sifrarniciService: SifrarniciService, private ref: DynamicDialogRef, private config: DynamicDialogConfig) {}
  fetchTableData(value: any) {
    //switch case
    console.log(value, 'na odabir dropdowna...');
  }

  onCloseClick(): void {
    this.ref.close();
  }

  submit() {
    console.log('submit');
    alert(JSON.stringify(this.model));
  }

  ngOnInit() {
    this.model = { ...this.config.data.sifrarnik };
  }

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'form-row',
      fieldGroup: [
        {
          key: 'Sifra',
          type: 'input',
          className: 'col-md-6',
          props: {
            label: 'Šifra',
            placeholder: 'Šifra',
            description: 'Šifra',
            required: true,
          },
        },
        {
          key: 'Naziv',
          type: 'input',
          className: 'col-md-6',
          props: {
            label: 'Naziv',
            placeholder: 'Naziv',
            description: 'Naziv',
            required: true,
          },
        },
        {
          key: 'Datepicker',
          type: 'datepicker',
          props: {
            label: 'Datepicker',
            placeholder: 'Placeholder',
            description: 'Description',
            dateFormat: 'yy/mm/dd',
            hourFormat: '24',
            numberOfMonths: 1,
            selectionMode: 'single',
            required: true,
            readonlyInput: false,
            showTime: false,
            showButtonBar: true,
            showIcon: false,
            showOtherMonths: true,
            selectOtherMonths: false,
            monthNavigator: false,
            yearNavigator: false,
            yearRange: '2020:2030',
            inline: false,
          },
        },
        {
          key: 'DatumPromjeneStatusa',
          type: 'input',
          className: 'col-md-6',
          props: {
            label: 'Datum promjene unosa',
            placeholder: 'Datum promjene unosa',
            description: 'Datum promjene unosa',
            required: true,
          },
        },
        {
          key: 'OIB',
          type: 'input',
          className: 'col-md-6',
          props: {
            label: 'OIB',
            placeholder: 'OIB',
            description: 'OIB',
            required: true,
          },
        },
        {
          key: 'Kontakt',
          type: 'input',
          className: 'col-md-6',
          props: {
            label: 'Kontakt',
            placeholder: 'Kontakt',
            description: 'Kontakt',
            required: true,
          },
        },
        {
          key: 'Zupanija',
          type: 'input',
          className: 'col-md-6',
          props: {
            label: 'Županija',
            placeholder: 'Županija',
            description: 'Županija',
            required: true,
          },
        },
        {
          key: 'Grad',
          type: 'input',
          className: 'col-md-6',
          props: {
            label: 'Grad',
            placeholder: 'Grad',
            description: 'Grad',
            required: true,
          },
        },
        {
          key: 'PostanskiBroj',
          type: 'input',
          className: 'col-md-6',
          props: {
            label: 'Poštanski broj',
            placeholder: 'Poštanski broj',
            description: 'Poštanski broj',
            required: true,
          },
        },
        {
          key: 'Ulica',
          type: 'input',
          className: 'col-md-6',
          props: {
            label: 'Ulica',
            placeholder: 'Ulica',
            description: 'Ulica',
            required: true,
          },
        },
        {
          key: 'KucniBroj',
          type: 'input',
          className: 'col-md-6',
          props: {
            label: 'Kućni broj',
            placeholder: 'Kućni broj',
            description: 'Kućni broj',
            required: true,
          },
        },
        {
          key: 'Eposta',
          type: 'input',
          className: 'col-md-6',
          props: {
            label: 'E-pošta',
            placeholder: 'E-pošta',
            description: 'E-pošta',
            required: true,
          },
        },
        {
          key: 'RegistarskiBrojPodruznice',
          type: 'input',
          className: 'col-md-6',
          props: {
            label: 'Registarski broj podružnice',
            placeholder: 'Registarski broj podružnice',
            description: 'Registarski broj podružnice',
            required: true,
          },
        },
        {
          key: 'PripadnostOdborima',
          type: 'input',
          className: 'col-md-6',
          props: {
            label: 'Pripadnost odborima',
            placeholder: 'Pripadnost odborima',
            description: 'Pripadnost odborima',
            required: true,
          },
        },
        {
          key: 'Aktivan',
          type: 'checkbox',
          className: 'col-md-6',
          props: {
            label: 'Aktivan',
            // placeholder: 'Aktivan',
            // description: 'Aktivan',
            // required: true,
          },
        },
      ],
    },

    // {
    //   key: 'Sifra',
    //   type: 'input',
    //   className: 'column',
    //   props: {
    //     label: 'Šifra',
    //     placeholder: 'Šifra',
    //     description: 'Šifra',
    //     required: true,
    //   },
    // },
    // {
    //   key: 'Sifra',
    //   type: 'input',
    //   className: 'column',
    //   props: {
    //     label: 'Šifra',
    //     placeholder: 'Šifra',
    //     description: 'Šifra',
    //     required: true,
    //   },
    // },
    // {
    //   key: 'Sifra',
    //   type: 'input',
    //   className: 'column3',
    //   props: {
    //     label: 'Šifra',
    //     placeholder: 'Šifra',
    //     description: 'Šifra',
    //     required: true,
    //   },
    // },
    // {
    //   key: 'Sifra',
    //   type: 'input',
    //   className: 'column3',
    //   props: {
    //     label: 'Šifra',
    //     placeholder: 'Šifra',
    //     description: 'Šifra',
    //     required: true,
    //   },
    // },
    // {
    //   key: 'Sifra',
    //   type: 'input',
    //   className: 'column3',
    //   props: {
    //     label: 'Šifra',
    //     placeholder: 'Šifra',
    //     description: 'Šifra',
    //     required: true,
    //   },
    // },
    // {
    //   key: 'Sifra',
    //   type: 'input',
    //   className: 'column3',
    //   props: {
    //     label: 'Šifra',
    //     placeholder: 'Šifra',
    //     description: 'Šifra',
    //     required: true,
    //   },
    // },

    // {
    //   key: 'Select',
    //   type: 'select',
    //   props: {
    //     label: 'Select',
    //     placeholder: 'Placeholder',
    //     description: 'Description',
    //     required: true,
    //     options: this.sifrarniciService.getSifrarniciDropdownData(),
    //   },
    //   hooks: {
    //     onInit: (field: FormlyFieldConfig) => {
    //       field.formControl.valueChanges.subscribe((value) => {
    //         // Call your API to fetch data based on the selected item
    //         this.fetchTableData(value); //API poziv za dohvat šifrarnika iz izbornika
    //         console.log(value);
    //       });
    //     },
    //   },
    // },
  ];
}
