import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UIFormlyConfigurationBuilder, UIFormlyConfigurationParams } from 'src/app/modules/layout/components/formly-form';
import { NoviSifrarnikComponent } from '../../components/novi-sifrarnik/novi-sifrarnik/novi-sifrarnik.component';
import { Sifrarnik } from '../../components/sifarnici-table/sifarnici-table.component';
import { SifrarniciService } from '../../service/sifrarniciService';

@Component({
  selector: 'app-sifarnici',
  templateUrl: './sifarnici.component.html',
  styleUrls: ['./sifarnici.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DialogService],
})
export class SifarniciComponent implements OnInit {
  public sifraID: string;
  ref: DynamicDialogRef | undefined;
  addNewSifrarnik(): void {
    this.ref = this.dialogService.open(NoviSifrarnikComponent, {
      modal: true,
      header: 'Unos šifrarnika',
      closable: false,
      width: window.innerWidth > 550 ? '70%' : '90%',
      data: {},
    });

    this.ref.onClose.subscribe((sifra: any) => {
      if (sifra) {
        alert(JSON.stringify(sifra));
      }
    });
  }

  dialogVisible = false;
  submitted = false;
  sifrarnici!: Sifrarnik[];
  sifrarnik!: Sifrarnik;
  selectedSifrarnik!: Sifrarnik[] | null;

  showDialog() {
    this.dialogVisible = true;
  }

  hideDialog() {
    this.dialogVisible = false;
    this.submitted = false;
  }

  fetchTableData(value: any) {
    //switch case
    console.log(value, 'na odabir dropdowna...');
  }

  constructor(private sifrarniciService: SifrarniciService, public dialogService: DialogService) {}

  ngOnInit(): void {
    console.log('init');
  }
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'Select',
      type: 'select',
      className: 'field',
      props: {
        label: 'Select',
        placeholder: 'Odabir šifrarnika...',
        description: 'Odabir šifrarnika...',
        required: true,
        options: this.sifrarniciService.getSifrarniciDropdownData(),
      },
      hooks: {
        onInit: (field: FormlyFieldConfig) => {
          field.formControl.valueChanges.subscribe((value) => {
            // Call your API to fetch data based on the selected item
            this.fetchTableData(value); //API poziv za dohvat šifrarnika iz izbornika
            this.submit();
            console.log(value);
          });
        },
      },
    },
  ];

  submit() {
    console.log('submit');
    if (this.form.valid) {
      alert(JSON.stringify(this.model));
    }
  }
}
