import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Livre } from './Models/LivreModel';

@Injectable({
  providedIn: 'root'
})
export class AddBooksService {
  livreUrl= environment.baseURL
AddLivres(livre):Observable<any> {
  return this.http.post<any>(this.livreUrl+"/Livres/addLivre",livre);

}

getAllLivres():Observable<Livre[]>{
  return this.http.get<Livre[]>(this.livreUrl+"/Livres/Livres")
}
getLivre(id):Observable<Livre>{
  return this.http.get<Livre>(this.livreUrl+"/Livres/Livres/"+id)
}
DeleteLivre(id):Observable<Livre>{
  return this.http.delete<Livre>(this.livreUrl+"/Livres/delLivre/"+id)
  
}
UpdateLivre(livre:any,id):Observable<Livre>{
  return this.http.put<Livre>(this.livreUrl+"/Livres/UpdateLivre/"+id,livre)
}

  constructor(private http:HttpClient) { }
  
}
