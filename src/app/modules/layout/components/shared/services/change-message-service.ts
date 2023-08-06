import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ChangeMessageService {
  readonly tableSelectionChanged = new Subject<any>();
  readonly dataChanged = new Subject<any>();
}
