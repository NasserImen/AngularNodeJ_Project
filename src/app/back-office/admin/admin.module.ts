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

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ConfirmationDialogComponent } from './dashboar/confirmation-dialog.component';
// import { ListbooksVComponent } from './listbooks-v/listbooks-v.component';
export const routes = [
  {  
    path: 'admin', 
    
     component: AdminComponent, children: [
         { path: 'dashboard', component: DashboarComponent },
         { path: 'addbook', component: AddbookComponent },
         { path:'addCategory', component:AddCategoryComponent}
        //  { path: 'listbooksV',component:ListbooksVComponent }
       
    ]
 }
];

@NgModule({
  declarations: [
    AdminComponent,
    AddbookComponent,
    DashboarComponent,

    AddCategoryComponent,
    ConfirmationDialogComponent

  ],
 entryComponents:[    ConfirmationDialogComponent
 ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDropzoneModule,
    

    
    
  ]
})
export class AdminModule { }
