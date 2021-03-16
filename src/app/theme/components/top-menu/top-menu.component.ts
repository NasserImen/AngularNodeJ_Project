import { Component, OnInit } from '@angular/core';
import { Data, AppService } from '../../../app.service';
import { Settings, AppSettings } from '../../../app.settings';
import { BehaviorSubject, Observable } from "rxjs";
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html'
})
export class TopMenuComponent implements OnInit {
  public currencies = ['USD', 'EUR'];
  public currency:any;
  public login=false;
  public text:string;
  userConnected = false
  isLoginSubject

  public flags = [
    { name:'English', image: 'assets/images/flags/gb.svg' },
    { name:'German', image: 'assets/images/flags/de.svg' },
    { name:'French', image: 'assets/images/flags/fr.svg' },
    { name:'Russian', image: 'assets/images/flags/ru.svg' },
    { name:'Turkish', image: 'assets/images/flags/tr.svg' }
  ]
  public flag:any;

  public settings: Settings;
  us: any;
  constructor(public appSettings:AppSettings, public appService:AppService, private authService: AuthService, private router:Router) { 
    this.settings = this.appSettings.settings; 
   
  } 
  init(){
    this.authService.isLoginSubject.subscribe( result => {
          
            this.isLoginSubject = result 
            
        }
    );
}
  ngOnInit() {  
    this.init() 
    if (localStorage.getItem("token")!= null){
      this.authService.isLoginSubject.next(true)
    }
    this.currency = this.currencies[0];
    this.flag = this.flags[0];    

  }

  public changeCurrency(currency){
    this.currency = currency;
  }

  public changeLang(flag){
    this.flag = flag;
  }

 public signout(){
   localStorage.removeItem("userconnected");
   localStorage.removeItem("token");
   this.authService.isLoginSubject.next(false);
 }

}
