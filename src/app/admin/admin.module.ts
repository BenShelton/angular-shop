import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { UserListComponent } from '../user-list/user-list.component';
import { UserComponent } from '../user/user.component';

import { ProductListModule } from '../product-list/product-list.module';
import { OrderListModule } from '../order-list/order-list.module';
import { EditProductModule } from '../edit-product/edit-product.module';
import { RegisterModule } from '../register/register.module';
import { AccountModule } from '../account/account.module';
import { ControlPanelModule } from '../control-panel/control-panel.module';

import { routes } from './admin.routes';

@NgModule({
  declarations: [
    AdminComponent,
    UserListComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    ProductListModule,
    OrderListModule,
    EditProductModule,
    RegisterModule,
    AccountModule,
    ControlPanelModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
