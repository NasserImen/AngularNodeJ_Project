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
import { ListcommandsComponent } from './listcommands/listcommands.component';
import { ComandDetailsComponent } from './listcommands/comand-details/comand-details.component';
// import {MatDialogModule} from '@angular/material/dialog';
import { ChartsModule,ThemeService } from 'ng2-charts';
import { AuthGuard } from 'src/app/guards/auth.guard';



export const routes = [
  {  
    path: 'admin', 
    
     component: AdminComponent, children: [
         { path: 'dashboard', component: DashboarComponent, canActivate:[AuthGuard] },
         { path: 'addbook', component: AddbookComponent , canActivate:[AuthGuard]},
         { path:'addCategory', component:AddCategoryComponent, canActivate:[AuthGuard]},
         { path: 'listCommands',component:ListcommandsComponent, canActivate:[AuthGuard] }
       
    ]
 }
];

@NgModule({
  declarations: [
    AdminComponent,
    AddbookComponent,
    DashboarComponent,

    AddCategoryComponent,
    ConfirmationDialogComponent,
    ListcommandsComponent,
    ComandDetailsComponent,
    // MatDialogModule

  ],
 entryComponents:[    ConfirmationDialogComponent, ComandDetailsComponent
 ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDropzoneModule,
    ChartsModule

    

    
    
  ],
  providers:[ThemeService]
})
export class AdminModule { }
