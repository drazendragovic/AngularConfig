import { Observable } from 'rxjs';

export interface DataSource<T> {
  readonly data$: Observable<T[]>;
  readonly total$: Observable<number>;
  readonly loading$: Observable<boolean>;
  readonly error$: Observable<Error>;
  query(skip?: number, take?: number): void;
  sort(field: keyof T, sortDirection: 'asc' | 'desc'): DataSource<T>;
  postProcess(postProcess: (result: T[]) => Observable<T[]>): DataSource<T>;
  getSort(): { field: keyof T; sortDirection: 'asc' | 'desc' }[];
}
