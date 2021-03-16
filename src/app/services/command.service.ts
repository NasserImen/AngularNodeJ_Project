import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { command } from '../back-office/admin/Models/command';

@Injectable({
  providedIn: 'root'
})
export class CommandService {
constructor(private http:HttpClient) { }
commandUrl= environment.baseURL

getAllCommands():Observable<command[]>{
  return this.http.get<command[]>(this.commandUrl+"/Orders/Orders")
}

  
}
