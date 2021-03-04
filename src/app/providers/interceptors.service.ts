import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorsService {

  constructor() { }
  intersept(request : HttpRequest<any> , next : HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token')
    if (token !== null){
      request =request.clone({
        setHeaders :{
          Authorization :`Bearer ${token}`
        }
      });
      return next.handle(request)
      } else{
        return next.handle(request)
      }
    }
  }