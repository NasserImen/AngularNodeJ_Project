import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { BackOfficeComponent } from './back-office.component';
import { from } from 'rxjs';
import { AddbookComponent } from './admin/addbook/addbook.component';


export const routes = [
  { path: 'addbook', component: AddbookComponent },
  
  {  
    path: 'backoffice', 
     component: BackOfficeComponent, children: [
         { path: 'addbook', component: AddbookComponent },
       
    ]
 }
 ];

@NgModule({
  declarations: [
    AdminComponent,
    
  ],
 
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),
    SharedModule,
    
  ]
})
export class BackofficeModule { }