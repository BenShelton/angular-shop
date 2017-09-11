import { Routes } from '@angular/router';

import { ManagerComponent } from './manager.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { OrderListComponent } from '../order-list/order-list.component';
import { EditProductComponent } from '../edit-product/edit-product.component';

export const routes: Routes = [
  { path: '', component: ManagerComponent, children: [
    { path: 'products/list', component: ProductListComponent },
    { path: 'products/add', component: EditProductComponent },
    { path: 'products/edit/:id', component: EditProductComponent },
    { path: 'orders/list', component: OrderListComponent }
  ]},
];
