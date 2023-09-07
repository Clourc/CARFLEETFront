import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let Authorization = '';
    if (localStorage.getItem('token')) {
      Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    const protectedUrls = ['/vehicles'];

    const urlRoute = new URL(request.url).pathname; // http://localhost:8080/only-admin-data => /only-admin-data

    if (protectedUrls.includes(urlRoute)) {
      return next.handle(
        request.clone({
          setHeaders: { Authorization },
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
