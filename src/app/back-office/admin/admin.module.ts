import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminComponent } from './admin.component';
import { BreadcrumbComponent } from 'src/app/theme/components/breadcrumb/breadcrumb.component';
import { MenuComponent } from 'src/app/theme/components/menu/menu.component';
import { PagesComponent } from 'src/app/pages/pages.component';
import { BackOfficeComponent } from '../back-office.component';
import {AddbookComponent} from '../admin/addbook/addbook.component'
import { DashboarComponent } from './dashboar/dashboar.component';
export const routes = [
  {  
    path: '', 
    
     component: AdminComponent, children: [
         { path: 'dashboard', component: DashboarComponent },
         { path: 'addbook', component: AddbookComponent },
       
    ]
 }
];

@NgModule({
  declarations: [
    AdminComponent,
    AddbookComponent,
    DashboarComponent
  ],
 
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    
    
  ]
})
export class AdminModule { }
