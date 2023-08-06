import { UtilsService } from '../../utils/utils.service';
import { StructureInfo } from '../structure/info';

export interface FunctionInfo<T = unknown, R = unknown> {
  reqInfo: StructureInfo<T>;
  resInfo: StructureInfo<R>;
}

export function createFunctionInfo<T, R>(reqInfo: StructureInfo<T>, resInfo: StructureInfo<R>): FunctionInfo<T, R> {
  return { reqInfo, resInfo };
}

export type FunctionInfoOrKey<T = unknown, R = unknown> = FunctionInfo<T, R> | string;

export function getFunctionKey(infoOrKey: FunctionInfoOrKey) {
  return UtilsService.isObject(infoOrKey) ? (infoOrKey as FunctionInfo).reqInfo.key : (infoOrKey as string);
}
