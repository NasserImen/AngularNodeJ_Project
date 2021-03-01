import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminComponent } from './admin.component';
import { BackOfficeComponent } from '../back-office.component';


export const routes = [
//  { path: 'backoffice', 
//       component: BackOfficeComponent, children: [
//           { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
//           { path: 'dashborad', component: AdminComponent, data: {  breadcrumb: 'dashborad' } }
      
// ]
//  }
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