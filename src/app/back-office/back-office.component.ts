import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Category } from '../app.models';
import { AppService } from '../app.service';
import { SidenavMenuService } from '../theme/components/sidenav-menu/sidenav-menu.service';
import { Settings, AppSettings } from '../app.settings';

@Component({
  selector: 'app-back-office',
  templateUrl: './back-office.component.html',
  styleUrls: ['./back-office.component.scss']
})
export class BackOfficeComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav: any;
  public sidenavOpen:boolean = true;
  public links = [
    {name:'Dashboard Admin',href:'dashboard',icon:'dashboard'} ,   
    { name: 'Add Book', href: 'addbook', icon: 'info' },
    { name: 'Order History', href: 'orders', icon: 'add_shopping_cart' },  
    { name: 'Logout', href: '/sign-in', icon: 'power_settings_new' },
  ];
  constructor(public router:Router) { }
  ngOnInit() {
    if(window.innerWidth < 960){
      this.sidenavOpen = false;
    };
  
  }
  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }

  ngAfterViewInit(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { 
        if(window.innerWidth < 960){
          this.sidenav.close(); 
        }
      }                
    });
  }

}
