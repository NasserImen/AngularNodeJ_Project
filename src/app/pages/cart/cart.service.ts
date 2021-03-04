import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
url : 'localhost:3000'
  constructor(private http : HttpClient) { }

  getbook(titre):Observable<any>{
    const getbook = this.http.get<any>(this.url + '/cart/getbook' , titre)
  }
}
