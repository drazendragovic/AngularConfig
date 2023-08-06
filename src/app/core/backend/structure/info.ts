import { UtilsService } from '../../utils/utils.service';

export interface StructureInfo<T = unknown> {
  key: string;
}

export type InfoOrKey<T = unknown> = StructureInfo<T> | string;

export function createStructureInfo<T>(key: string): StructureInfo<T> {
  return { key };
}

export function getKey(infoOrKey: InfoOrKey) {
  return UtilsService.isObject(infoOrKey) ? (infoOrKey as StructureInfo).key : (infoOrKey as string);
}
