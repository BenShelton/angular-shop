import { Routes, CanActivate } from '@angular/router';

import { AdminGuard } from './guards/admin.guard';
import { ManagerGuard } from './guards/manager.guard';

import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OrderListComponent } from './order-list/order-list.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'orders', component: OrderListComponent },
  {
    path: 'manager',
    canActivate: [ManagerGuard],
    loadChildren: './manager/manager.module#ManagerModule'
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: './admin/admin.module#AdminModule'
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account', component: AccountComponent },
  { path: '**', component: PageNotFoundComponent }
];
