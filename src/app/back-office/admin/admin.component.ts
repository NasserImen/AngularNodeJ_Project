import { Component, OnInit, HostListener, ViewChild } from '@angular/core'; 
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
 
})
export class AdminComponent implements OnInit {
  
  @ViewChild('sidenav', { static: true }) sidenav: any;
  public sidenavOpen:boolean = true;
  public links = [
    {name:'Dashboard Admin',href:'dashboard',icon:'dashboard'} ,   
    { name: 'Add Book', href: 'addbook', icon: 'info' },
    { name: 'Add category', href: 'addCategory', icon: 'info'},
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