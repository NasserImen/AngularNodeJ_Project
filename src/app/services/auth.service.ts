import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url='/api'
  constructor(private http:HttpClient) { }
  
   postusers(user):Observable<any>{
    return this.http.post<any>(this.url + "/auth/register" ,user)
  }

  login(user):Observable<any>{
   return this.http.post<any>(this.url + "/auth/login",user)
  }

}

