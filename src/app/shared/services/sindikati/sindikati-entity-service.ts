import { Message } from 'primeng/api';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Entity } from 'src/app/core/models/entity/entity';
import { EntityService, InfoOrKey } from 'src/app/core';
import { BackendRestService } from 'src/app/core/services/rest.service';
import { FormState } from 'src/app/modules/layout/components/formly-form';
import { SindikatiMessageService } from './sindikati-message-service';

export class SindikatiEntityService<T extends Entity> extends EntityService<T> {
  constructor(
    protected override infoOrKey: InfoOrKey<T>,
    protected override restService: BackendRestService,
    private messageService: SindikatiMessageService
  ) {
    super(infoOrKey, restService);
  }

  saveWithMessage(entity: T, formState: FormState, clearMessages = true, saveMessage?: Message): Observable<any> {
    switch (formState) {
      case FormState.New:
        return this.insert(entity).pipe(
          tap((x: { id: string }) => {
            this.messageService.showSuccessMessage(clearMessages, saveMessage);
          }),
          catchError((err) => {
            return throwError(() => err);
          })
        );
      case FormState.Edit:
        return this.update(entity).pipe(
          tap((x: void) => {
            this.messageService.showSuccessMessage(clearMessages, saveMessage);
          }),
          catchError((err) => {
            return throwError(() => err);
          })
        );
    }

    throw new Error('Invalid form state.');
  }

  deleteWithMessage(id: string, clearMessages = true, deleteMessage?: Message): Observable<string> {
    return this.delete(id).pipe(
      tap((x: string) => {
        this.messageService.showDeleteMessage(clearMessages, deleteMessage);
      }),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getEntityById(id: string): Observable<T> {
    return this.single(id).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }
}
