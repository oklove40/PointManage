import { BeforePayCheckListComponent } from './before-pay-check-list/before-pay-check-list.component';
import { FindUserComponent } from './find-user/find-user.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './order.component';

const routes: Routes = [
  { path: '', component: OrderComponent },
  { path: ':sid', component: OrderComponent },
  { path: 'menu-list:sid', component: MenuListComponent },
  { path: 'find-user:sid', component: FindUserComponent },
  { path: 'before-pay-check-list:sid', component: BeforePayCheckListComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
