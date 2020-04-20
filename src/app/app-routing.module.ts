import { ShopComponent } from './shop/shop.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'order', loadChildren: () => import('./order/order.module').then( m => m.OrderModule) },
  { path: 'menu', loadChildren: () => import('./menu/menu.module').then( m => m.MenuModule) },
  { path: 'user', loadChildren: () => import('./user/user.module').then( m => m.UserModule) },
  { path: 'shop', component: ShopComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
