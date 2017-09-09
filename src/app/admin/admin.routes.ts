import { Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { OrderListComponent } from '../order-list/order-list.component';
import { UserListComponent } from '../user-list/user-list.component';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { RegisterComponent } from '../register/register.component';

export const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: 'products/list', component: ProductListComponent },
    { path: 'products/add', component: EditProductComponent },
    { path: 'products/edit', component: EditProductComponent },
    { path: 'orders/list', component: OrderListComponent },
    { path: 'users/list', component: UserListComponent },
    { path: 'users/add', component: RegisterComponent }

  ]},
];
