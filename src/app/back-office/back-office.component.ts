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
  

  ngOnInit() {
  
  }

}
