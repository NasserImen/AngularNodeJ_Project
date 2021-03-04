import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BooksService {

   url = 'localhost:3000/Livres'
   result : any

  constructor( private http : HttpClient) { }

  getbooks():Observable<any>{
    return this.result = this.http.get<any>(this.url + '/Livres');
  }
}
