import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  public isSticky = true;

  constructor(private messageService: MessageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((error) => this.errorHandler(error)));
  }

  private errorHandler(error: HttpEvent<any>): Observable<HttpEvent<any>> {
    let message: string;

    if (!environment.production) {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          message = 'User not authorized!';
          this.isSticky = false;
        }
        const applicationError = error.headers.get('Application-Error');
        if (applicationError) {
          const error = JSON.parse(applicationError);
          message = error.Message;
          this.isSticky = false;
        }
        const serverError = error.error;
        let modalStateErrors = '';
        if (serverError && typeof serverError === 'object') {
          for (const key in serverError) {
            if (serverError[key]) {
              modalStateErrors += serverError[key] + '\n';
            }
          }
        }
        message = modalStateErrors || serverError || 'Server Error';
        this.isSticky = false;
      }
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Greška',
      detail: message,
      sticky: this.isSticky,
      life: this.isSticky ? null : 5000,
    });

    return throwError(() => new Error(message));
  }
}
