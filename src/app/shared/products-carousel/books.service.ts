import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BooksService {

   url = 'http://localhost:3000'
   result : any

  constructor( private http : HttpClient) { }

  getbooks():Observable<any>{
     this.result = this.http.get<any>(this.url + '/Livres/Livres');
     return(this.result)
  }
}
