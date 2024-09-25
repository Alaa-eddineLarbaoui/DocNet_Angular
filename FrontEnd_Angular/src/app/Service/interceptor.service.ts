import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {JwtDto} from "../Models/JwtDto";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const storedJwtData = localStorage.getItem('jwtData');
    if (storedJwtData) {
      const jwtData: JwtDto = JSON.parse(storedJwtData);
      const token = jwtData.token;
      console.log("----------> " + token);

      if (token) {
        const cloned = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next.handle(cloned);
      }
    }

    return next.handle(req);
  }
}

