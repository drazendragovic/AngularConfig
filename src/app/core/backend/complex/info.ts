import { FunctionInfo } from '../function/info';

export interface ComplexGetInfo<T> {
  getFunctionInfo: FunctionInfo<{ ID: string }, T>;
}

export interface ComplexInfo<T> extends ComplexGetInfo<T> {
  saveFunctionInfo: FunctionInfo<T, T>;
}

export function createComplexGetInfo<T>(getFunctionInfo: FunctionInfo<string, T>): ComplexGetInfo<T> {
  return { getFunctionInfo };
}

export function createComplexInfo<T>(
  getFunctionInfo: FunctionInfo<{ ID: string }, T>,
  saveFunctionInfo: FunctionInfo<T, T>
): ComplexInfo<T> {
  return { getFunctionInfo, saveFunctionInfo };
}
