import { BehaviorSubject, Observable } from 'rxjs';
import { LookupDataSource } from '../../models/dataSource/lookup-data-source';

export interface StaticLookupDataSourceConfiguration<T> {
  displayField: keyof T;
  valueField: keyof T;
  items: T[];
}

export class StaticLookupDataSource<T> implements LookupDataSource {
  private data$$ = new BehaviorSubject<any>([]);
  readonly data$: Observable<any> = this.data$$.asObservable();
  readonly error$: Observable<Error> = new Observable<Error>();
  readonly valueField: string;
  readonly displayField: string;
  private _items: any[] = [];

  private _sortField: keyof T;
  private _sortDirection: 'asc' | 'desc';
  private sortFunction: (sortField: keyof T, sortDirection: 'asc' | 'desc', a: T, b: T) => -1 | 0 | 1;

  constructor(config: StaticLookupDataSourceConfiguration<T>) {
    this.valueField = config.valueField as string;
    this.displayField = config.displayField as string;
    this._items = [...config.items];
  }

  loadIds(...ids: string[]): Observable<any> {
    throw new Error('Function loadIds on StaticLookupDataSource is not supported.');
  }

  cascadeFilter(filter: any): void {
    throw new Error('Function cascadeFilter on StaticLookupDataSource is not supported.');
  }

  search(value: string): void {
    const filteredItems = this._items.filter((x) => (x[this.displayField] as string).startsWith(value));
    this.data$$.next(filteredItems);
  }

  load(): void {
    this.data$$.next(this._items);
  }

  currentData(): any[] {
    return [...this._items];
  }

  setData(data: any[]): void {
    this._items = [...data];
    if (this.sortFunction) {
      this._items.sort((a, b) => this.sortFunction(this._sortField, this._sortDirection, a, b));
    }
    this.load();
  }

  destroy(): void {
    this.data$$.complete();
  }

  public sort(field: keyof T, sortDirection: 'asc' | 'desc' = 'asc'): StaticLookupDataSource<T> {
    this._sortField = field;
    this._sortDirection = sortDirection;

    this.sortFunction = function (sortField, sortDirection, a, b) {
      let result: -1 | 0 | 1;

      if (a[sortField] < b[sortField]) {
        result = -1;
      } else if (a[sortField] > b[sortField]) {
        result = 1;
      } else {
        result = 0;
      }

      if (sortDirection === 'asc') {
        return result;
      }

      if (result === 0) {
        return result;
      }

      if (result === -1) {
        return 1;
      }

      return -1;
    };

    if (this.sortFunction) {
      this._items.sort((a, b) => this.sortFunction(this._sortField, this._sortDirection, a, b));
    }

    return this;
  }
}
