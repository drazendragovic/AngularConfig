import { createStructureInfo } from 'src/app/core';

/* eslint-disable @typescript-eslint/no-namespace */
export namespace Sifarnik {
  export interface ISifarnik {
    id?: string;
    naziv?: string;
  }

  export interface ISifra {
    id: string;
    naziv?: string;
    datum?: Date;
    aktivan?: boolean;
    datumpromjene?: Date;
    sifra?: number;
    registarskiBroj?: string;
    oib?: string;
    kontakt?: string;
    zupanija?: string;
    grad?: string;
    postanskiBroj?: string;
    ulica?: string;
    kucniBroj?: string;
    email?: string;
  }

  export const ISifarnikLookupInfo = createStructureInfo<Sifarnik.ISifarnikLookup>('sifarnik');
  export interface ISifarnikLookup {
    poslodavacList?: IPoslodavac[];
    podruznicaList?: IPodruznica[];
    odborList?: IOdbor[];
    zupanijaList?: IZupanija[];
    tijelaList?: ITijelo[];
    funkcijaList?: IFunkcija[];
    strucnaSpremaList?: IStrucnaSprema[];
    statusList?: IClanStatus[];
    statusPogodnostiList?: IStatusPogodnosti[];
    evidencijaUplataList?: IEvidencijaUplate[];
    vrstaPrilogaList?: IVrstaPriloga[];
    tipPrilogaList?: ITipPriloga[];
    mjeseciList?: IMjesec[];
    godinaList?: IGodina[];
    zanimanjeList?: IZanimanje[];
  }

  export const ClanStatusInfo = createStructureInfo<Sifarnik.IClanStatus>('sifarnik/clan-status');
  export interface IClanStatus {
    id: string;
    naziv?: string;
    datum?: Date;
    aktivan: boolean;
    datumpromjene?: Date;
  }

  export const EvidencijaUplateInfo = createStructureInfo<Sifarnik.IEvidencijaUplate>('sifarnik/evidencija-uplate');
  export interface IEvidencijaUplate {
    id: string;
    naziv?: string;
    datum?: Date;
    aktivan: boolean;
    datumpromjene?: Date;
  }

  export const FunkcijaInfo = createStructureInfo<Sifarnik.IFunkcija>('sifarnik/funkcija');
  export interface IFunkcija {
    id: string;
    naziv?: string;
    datum?: Date;
    aktivan: boolean;
    datumpromjene?: Date;
  }

  export const GodinaInfo = createStructureInfo<Sifarnik.IGodina>('sifarnik/godina');
  export interface IGodina {
    id: string;
    naziv?: string;
    datum?: Date;
    aktivan: boolean;
    datumpromjene?: Date;
  }

  export const MjesecInfo = createStructureInfo<Sifarnik.IMjesec>('sifarnik/mjesec');
  export interface IMjesec {
    id: string;
    naziv?: string;
    datum?: Date;
    aktivan: boolean;
    datumPromjene?: Date;
  }

  export const OdborInfo = createStructureInfo<Sifarnik.IOdbor>('sifarnik/odbor');
  export interface IOdbor {
    id: string;
    naziv?: string;
    datum?: Date;
    aktivan: boolean;
    datumPromjene?: Date;
  }

  export const PodruznicaInfo = createStructureInfo<Sifarnik.IPodruznica>('sifarnik/podruznica');
  export interface IPodruznica {
    id: string;
    naziv?: string;
    datum?: Date;
    aktivan: boolean;
    datumPromjene?: Date;
    sifra?: number;
    registarskiBroj?: string;
  }

  export const PoslodavacInfo = createStructureInfo<Sifarnik.IPoslodavac>('sifarnik/poslodavac');
  export interface IPoslodavac {
    id: string;
    naziv?: string;
    datum?: Date;
    aktivan: boolean;
    datumPromjene?: Date;
    sifra?: number;
    oib?: string;
    kontakt?: string;
    zupanijaId?: number;
    grad?: string;
    postanskiBroj?: string;
    ulica?: string;
    kucniBroj?: string;
    email?: string;
  }

  export const StatusPogodnostiInfo = createStructureInfo<Sifarnik.IStatusPogodnosti>('sifarnik/status-pogodnosti');
  export interface IStatusPogodnosti {
    id: string;
    naziv?: string;
    datum?: Date;
    aktivan: boolean;
    datumPromjene?: Date;
  }

  export const StrucnaSpremaInfo = createStructureInfo<Sifarnik.IStrucnaSprema>('sifarnik/strucna-sprema');
  export interface IStrucnaSprema {
    id: string;
    naziv?: string;
    datum?: Date;
    aktivan: boolean;
    datumPromjene?: Date;
    sifra?: number;
  }

  export const TijeloInfo = createStructureInfo<Sifarnik.ITijelo>('sifarnik/tijelo');
  export interface ITijelo {
    id: string;
    naziv?: string;
    datum?: Date;
    aktivan: boolean;
    datumPromjene?: Date;
    sifra?: number;
  }

  export const TipPrilogaInfo = createStructureInfo<Sifarnik.ITipPriloga>('sifarnik/tip-priloga');
  export interface ITipPriloga {
    id: string;
    naziv?: string;
    datum?: Date;
    aktivan: boolean;
    datumPromjene?: Date;
  }

  export const VrstaPrilogaInfo = createStructureInfo<Sifarnik.IVrstaPriloga>('sifarnik/vrsta-priloga');
  export interface IVrstaPriloga {
    id: string;
    naziv?: string;
    datum?: Date;
    aktivan: boolean;
    datumPromjene?: Date;
  }

  export const ZanimanjeInfo = createStructureInfo<Sifarnik.IZanimanje>('sifarnik/zanimanje');
  export interface IZanimanje {
    id: string;
    naziv?: string;
    datum?: Date;
    aktivan: boolean;
    datumPromjene?: Date;
    sifra?: number;
  }

  export const ZupanijaInfo = createStructureInfo<Sifarnik.IZupanija>('sifarnik/zupanija');
  export interface IZupanija {
    id: string;
    naziv?: string;
    datum?: Date;
    aktivan: boolean;
    datumPromjene?: Date;
    sifra?: number;
  }
}
