import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , BehaviorSubject} from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoginSubject = new BehaviorSubject<boolean>(false);
  url= environment.baseURL;
  constructor(private http:HttpClient ) { }
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return token ==null;
  }
  
   postusers(user):Observable<any>{
    
    return this.http.post<any>(this.url + "/auth/register" ,user)
  }

  login(user):Observable<any>{
   return this.http.post<any>(this.url + "/auth/login",user)
  }
 

}

