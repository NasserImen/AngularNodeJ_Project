import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AccountComponent } from './account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InformationComponent } from './information/information.component';
import { AddressesComponent } from './addresses/addresses.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

export const routes = [
  {  
      path: '', 
      component: AccountComponent, children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: DashboardComponent, data: {  breadcrumb: 'Dashboard' }, canActivate:[AuthGuard] },
          { path: 'information', component: InformationComponent, data: {  breadcrumb: 'Information' }, canActivate:[AuthGuard] },
          { path: 'addresses', component: AddressesComponent, data: {  breadcrumb: 'Addresses' }, canActivate:[AuthGuard] },
          { path: 'orders', component: OrdersComponent, data: {  breadcrumb: 'Orders' }, canActivate:[AuthGuard] },
         
      ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    AccountComponent,
    DashboardComponent,
    InformationComponent,
    AddressesComponent,
    OrdersComponent,
    OrderDetailsComponent,
    
  ],
  entryComponents:[    OrderDetailsComponent ],
})
export class AccountModule { }
