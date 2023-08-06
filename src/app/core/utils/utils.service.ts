/* eslint-disable no-plusplus */
import { Injectable } from '@angular/core';
import { IsActiveMatchOptions } from '@angular/router';
import { SafeAny } from '../models/api/safe-any';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  get exactMatchOptions(): IsActiveMatchOptions {
    return {
      paths: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored',
      queryParams: 'exact',
    };
  }

  get subsetMatchOptions(): IsActiveMatchOptions {
    return {
      paths: 'subset',
      fragment: 'ignored',
      matrixParams: 'ignored',
      queryParams: 'subset',
    };
  }

  public static randomId(length = 10): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let name = '';

    for (let i = 0; i < 10; i++) {
      name += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return name;
  }

  public static deepEqual(object1: SafeAny, object2: SafeAny, treatEmptyAsUndefined = false): boolean {
    if (!object1 && !object2) return true;
    if (!object1 || !object2) return false;

    if (Array.isArray(object1) && Array.isArray(object2)) {
      if (object1.length !== object2.length) return false;

      for (let i = 0; i < object1.length; i++) {
        if (!this.deepEqual(object1[i], object2[i])) return false;
      }
      return true;
    }
    if (Array.isArray(object1) || Array.isArray(object2)) return false;

    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    let keys: string[];

    if (treatEmptyAsUndefined) {
      keys = this.distinct(keys1.concat(keys2));
    } else {
      if (keys1.length !== keys2.length) return false;
      keys = keys1;
    }

    for (const key of keys) {
      const val1 = object1[key];
      const val2 = object2[key];
      const areObjects = this.isObject(val1) && this.isObject(val2);
      if (areObjects) {
        if (!this.deepEqual(val1, val2)) return false;
      } else {
        if (treatEmptyAsUndefined && !val1 && !val2) continue;
        if (val1 !== val2) return false;
      }
    }

    return true;
  }

  public static isObject(object: SafeAny): boolean {
    return object != null && typeof object === 'object';
  }

  public static distinct(array: any[]): any[] {
    const a = [...array];
    for (let i = 0; i < a.length; ++i) {
      for (let j = i + 1; j < a.length; ++j) {
        if (a[i] === a[j]) a.splice(j--, 1);
      }
    }

    return a;
  }

  public static isArray(value: SafeAny): boolean {
    return Array.isArray(value);
  }

  public static newGuid() {
    return uuidv4();
  }

  public static padNumber(num: number, size: number): string {
    let result = num.toString();
    while (result.length < size) result = '0' + result;
    return result;
  }
}

export class DateUtil {
  static msDateRegex = '\\/Date\\((-?[0-9]{1,15})([+-][0-9]{4})?\\)\\/';
  static iso8601 = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/;

  static isIso8601Date(ds: string): boolean {
    return DateUtil.iso8601.test(ds ?? '');
  }

  static isMsDate(ds: string): boolean {
    return new RegExp(this.msDateRegex).test(ds ?? '');
  }

  static msToJsDate(ds: string): Date {
    if (!ds) {
      throw new Error('Invalid msDate value: ' + ds);
    }

    if (!this.isMsDate(ds)) {
      throw new Error('Value is not in a proper msDate format: ' + ds);
    }

    const dobj = ds.match(this.msDateRegex);
    if (!dobj) {
      throw new Error('Invalid msDate value: ' + ds);
    }

    const T = parseInt(dobj[1], 10);
    return new Date(T);
  }

  static jsToMsDate(value: Date): string {
    const intOffset = (value.getTimezoneOffset() * 100) / 60;
    let offset = '';
    if (intOffset < 0) {
      offset = `+${UtilsService.padNumber(Math.abs(intOffset), 4)}`;
    } else if (intOffset > 0) {
      offset = `-${UtilsService.padNumber(Math.abs(intOffset), 4)}`;
    }
    return `/Date(${value.getTime()}${offset})/`;
  }

  static jsToIsoStringDate(value: Date): string {
    //remove timezone part
    //send client time and date to backend as utc time
    return moment(value).toISOString(true).substring(0, 23);
  }
}
