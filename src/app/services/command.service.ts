import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { command } from '../back-office/admin/Models/command';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  hhtpHeaders;
  options;
  token;
constructor(private http:HttpClient) { this.token=localStorage.getItem('token')
this.hhtpHeaders=new HttpHeaders({
  'Authorization':'Bearer'+this.token
})
this.options={Headers:this.hhtpHeaders}
}
commandUrl= environment.baseURL

getAllCommands(){
  return this.http.get(this.commandUrl+"/Orders/Orders",this.options)
}
UpdateCommand(id,command):Observable<command>{
  return this.http.put<command>(this.commandUrl+"/Orders/UpdateOrder/"+id,command)
}
getUserOrders(id):Observable<command[]>{
  return this.http.get<command[]>(this.commandUrl+"/Orders/UserOrders")
}  
}
