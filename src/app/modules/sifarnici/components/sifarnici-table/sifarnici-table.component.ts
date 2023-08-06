/* eslint-disable @angular-eslint/component-selector */
import { Component, Input, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SifrarniciService } from '../../service/sifrarniciService';
import { NoviSifrarnikComponent } from '../novi-sifrarnik/novi-sifrarnik/novi-sifrarnik.component';

export interface Sifrarnik {
  Sifra?: string;
  Naziv?: string;
  Aktivan?: string;
  DatumUnosa?: string;
  DatumPromjeneStatusa?: string;
  OIB?: string;
  Kontakt?: string;
  Zupanija?: string;
  Grad?: string;
  PostanskiBroj?: string;
  Ulica?: string;
  KucniBroj?: string;
  Eposta?: string;
  RegistarskiBrojPodruznice?: string;
  PripadnostOdborima?: string;
}
@Component({
  selector: 'sifarnici-table',
  templateUrl: './sifarnici-table.component.html',
  styleUrls: ['./sifarnici-table.component.scss'],
  providers: [DialogService],
})
export class SifarniciTableComponent implements OnInit {
  @Input() sifraID: string;

  sifrarnikDialog = false;
  sifrarnici!: Sifrarnik[];
  sifrarnik!: Sifrarnik;

  constructor(private sifrarniciService: SifrarniciService, public dialogService: DialogService) {
    console.log();
  }

  stavke = this.sifrarniciService.getSifrarniciData();

  ngOnInit() {
    console.log('init-table');
  }
  ref: DynamicDialogRef | undefined;
  editRedak(sifrarnik: Sifrarnik) {
    this.sifrarnik = { ...sifrarnik };
    this.sifrarnikDialog = true;
    //alert(JSON.stringify(sifrarnik.Sifra));

    this.ref = this.dialogService.open(NoviSifrarnikComponent, {
      modal: true,
      header: 'Unos šifrarnika',
      closable: false,
      width: window.innerWidth > 550 ? '70%' : '90%',
      //data: {},
      // data: {
      //   Sifra: sifrarnik.Sifra,
      // },
      data: {
        sifrarnik: { ...sifrarnik }, // Pass the sifrarnik data to the NoviSifrarnikComponent
      },
    });

    this.ref.onClose.subscribe((sifra: any) => {
      if (sifra) {
        alert(JSON.stringify(sifra));
      }
    });
  }

  deleteRedak(sifrarnik: Sifrarnik) {
    this.sifrarnik = { ...sifrarnik };
    this.sifrarnikDialog = true;
    //alert(JSON.stringify(sifrarnik.Sifra));

    const index = this.stavke.findIndex((item) => item.Sifra === sifrarnik.Sifra);
    //alert(JSON.stringify(index));
    alert(this.stavke.length);
    if (index !== -1) {
      // Call the sifrarniciService to remove the row from the data source.
      //this.sifrarniciService.deleteSifrarnik(sifrarnik.Sifra).subscribe(() => {
      // After successful deletion, remove the item from the stavke array.
      this.stavke.splice(index, 1);
      //});

      alert(this.stavke.length);
    }
  }
}
