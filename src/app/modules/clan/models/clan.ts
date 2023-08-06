import { createStructureInfo } from 'src/app/core/backend/structure/info';

/* eslint-disable @typescript-eslint/no-namespace */
export namespace Clan {
  export const ClanInfo = createStructureInfo<Clan.IClan>('Clan');
  export interface IClan {
    id: string;
    registarskiBroj: string;
    zupanijaNaziv?: string;
    strucnaSpremaNaziv?: string;
    zanimanjeNaziv?: string;
    poslodavacNaziv?: string;
    podružnicaNaziv?: string;
    tijeloNaziv?: string;
    clanStatusId: number;
    ime: string;
    prezime: string;
    oib: string;
    email?: string;
    brojTelefona?: string;
    datumRodjenja: Date;
    zupanijaId: number;
    grad: string;
    postanskiBroj: string;
    ulica: string;
    kucniBroj: string;
    strucnaSpremaId: number;
    zvanje?: string;
    zanimanjeId?: number;
    pocetakClanstava: Date;
    zavrsetakClanstava: Date;
    poslodavacId: number;
    podruznicaId: number;
    tijeloId: number;
    korisnikUnio: string;
    datumUnosa: Date;
    aktivan: boolean;
  }

  export interface IMail {
    id: string;
    predmet: string;
    sadrzaj: string;
    emails?: string[];
  }

  export interface IUplataClanarine {
    id: string;
    evidencija: string;
    mjesec: string;
    godina: string;
  }

  export interface IFunkcija {
    id: string;
    poslodavac: string;
    podruznica: string;
    funkcija: string;
    pocetakMjesec: string;
    pocetakGodina: string;
    zavrsetakMjesec: string;
    zavrsetakGodina: string;
  }

  export interface IOdbor {
    id: string;
    odbor: string;
  }

  export interface IFondSolidarnostiLookup {
    id: string;
    status: string;
    clan: string;
  }

  export interface IZahtjevFondSolidarnosti {
    id: string;
    status?: string;
    clan: string;
    iban: string;
    izvanredniSlucaj?: boolean;
    socijalnaUgrozenost?: boolean;
    teskaBolest?: boolean;
    smrtClana?: boolean;
    invaliditet?: boolean;
    izvanredniSlucajDatum?: Date;
    izvanredniSlucajOpis?: string;
    izvanredniSlucajSteta?: string;
    socijalnaUgrozenostOpis?: string;
    invaliditetNastanak?: Date;
    invaliditetDogadaj?: string;
    invaliditetPovreda?: string;
    invaliditetBolest?: boolean;
    invaliditetBolestOpis?: string;
    invaliditetBolestLijecenje?: string;
    dokumentacija?: any[];
  }
}
