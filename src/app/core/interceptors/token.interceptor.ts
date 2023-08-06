import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': '',
    };

    const token = 'token'; /* napraviti servis s kojim se dohvati i spremi token */

    if (token) {
      headersConfig['Authorization'] = `Bearer ${token}`;
    }

    request = request.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}
