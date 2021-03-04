import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  url ='localhost:3000/commande'
  result : any
  constructor(private http : HttpClient) { }
  


  addCommande(commande):Observable<any>{
    return this.result = this.http.post<any>(this.url + '/addbook', commande);
  }
}
