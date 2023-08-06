/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-namespace */
import { createStructureInfo } from 'src/app/core';

export namespace Clan {
  export const OrganizationUnitLookupInfo = createStructureInfo<Clan.IOrganizationUnitLookup>('Clan/OrganizationUnitLookup');
  export interface IOrganizationUnitLookup {
    id: string;
    code?: string;
    name?: string;
    nameForDisplay?: string;
    firstParentID?: string;
    mainParentID?: string;
    position: number;
    hierarchyLevel: number;
  }

  export const FunkcijeInfo = createStructureInfo<Clan.IFunkcije>('Sifarnik/Funkcija');
  export interface IFunkcije {
    id: string;
    naziv: string;
  }
}
