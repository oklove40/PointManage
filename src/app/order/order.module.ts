import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { MenuListComponent } from './menu-list/menu-list.component';
import { FindUserComponent } from './find-user/find-user.component';
import { BeforePayCheckListComponent } from './before-pay-check-list/before-pay-check-list.component';
import { OrderComponent } from './order.component';


@NgModule({
  declarations: [MenuListComponent, FindUserComponent, BeforePayCheckListComponent, OrderComponent],
  imports: [
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
