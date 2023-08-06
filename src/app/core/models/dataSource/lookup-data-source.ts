import { Observable } from 'rxjs';
import { SafeAny } from '../api/safe-any';

export interface LookupDataSource {
  readonly data$: Observable<any>;
  readonly error$: Observable<Error>;
  readonly valueField: string;
  readonly displayField: string;
  search: (value: string) => void;
  loadIds: (...ids: string[]) => Observable<any>;
  load: () => void;
  destroy: () => void;
  cascadeFilter: (filter: SafeAny) => void;
  currentData: () => any[];
}
