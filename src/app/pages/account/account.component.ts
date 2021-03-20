import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav: any;
  public sidenavOpen:boolean = true;
  public links = [
    { name: 'Account Dashboard', href: 'dashboard', icon: 'dashboard' },
    { name: 'Account Information', href: 'information', icon: 'info' },
    { name: 'Addresses', href: 'addresses', icon: 'location_on' },
    { name: 'Order History', href: 'orders', icon: 'add_shopping_cart' },  

  ];
  constructor(public router:Router,private authService: AuthService) { }

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
  removeAdminConnect(){
    localStorage.removeItem('userId')
    localStorage.removeItem('userconnected')
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    localStorage.removeItem('user')
    this.authService.isLoginSubject.next(false);

    this.router.navigate(['/sign-in'])
  }


}
