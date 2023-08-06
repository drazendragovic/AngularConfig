import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent,
} from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private readonly spinner: NgxSpinnerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any> | HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    this.spinner.show('appspiner', {
      type: 'ball-spin',
      size: 'medium',
      bdColor: '#FBFBFB',
      color: '#99D2ED',
      fullScreen: true,
    });

    return next.handle(req).pipe(finalize(() => this.spinner.hide('appspiner')));
  }
}
