import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartDashboardComponent } from './components/cart-dashboard/cart-dashboard.component';
import { CartTableComponent } from './components/cart-table/cart-table.component';
import { SharedModule } from '../shared/shared.module';
import { CartCheckoutComponent } from './components/cart-checkout/cart-checkout.component';


@NgModule({
  declarations: [
    CartDashboardComponent,
    CartTableComponent,
    CartCheckoutComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule,
  ]
})
export class CartModule { }
