import { Observable, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataSource } from '../models/dataSource/data-source';

export class StaticDataSource<T> implements DataSource<T> {
  data$: Observable<T[]>;
  total$: Observable<number>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;

  private fetchData$$ = new Subject<T[]>();
  private total$$ = new Subject<number>();
  private error$$ = new Subject<Error>();

  private data: T[];

  constructor(data: T[]) {
    this.data = [...data];

    this.total$ = this.total$$.pipe(
      switchMap((e: number) => {
        return of(e);
      })
    );

    this.error$ = this.error$$;
    this.loading$ = of(false);
    this.data$ = this.fetchData$$.pipe(
      switchMap((e: T[]) => {
        this.total$$.next(e.length);

        return of(e);
      })
    );
  }

  query(skip?: number, take?: number): void {
    this.fetchData$$.next(this.data);
  }

  public setData(data: T[]): void {
    this.data = [...data];
    this.fetchData$$.next(data);
  }

  postProcess(postProcess: (result: T[]) => Observable<T[]>): DataSource<T> {
    throw new Error('Function postProcess on StaticDataSource is not supported.');
  }

  getSort(): { field: keyof T; sortDirection: 'asc' | 'desc' }[] {
    return [];
  }

  sort(field: keyof T, sortDirection: 'asc' | 'desc'): DataSource<T> {
    throw new Error('Function sort on StaticDataSource is not supported.');
  }

  currentData(): T[] {
    return this.data;
  }
}
