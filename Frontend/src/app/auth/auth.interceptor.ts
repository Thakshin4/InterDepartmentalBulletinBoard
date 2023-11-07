import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authservice: AuthServiceService) {}
        
    intercept(request: HttpRequest<unknown>, next: HttpHandler)
    {
        const authToken = this.authservice.getToken();
        const authRequest = request.clone({headers:request.headers.set("Authorization", "Bearer " + authToken)});
        
        return next.handle(request);
    }
}