import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ManagerComponent } from './manager.component';
import { ControlPanelComponent } from '../control-panel/control-panel.component';
import { UserListComponent } from '../user-list/user-list.component';
import { UserComponent } from '../user/user.component';

import { ProductListModule } from '../product-list/product-list.module';
import { OrderListModule } from '../order-list/order-list.module';
import { EditProductModule } from '../edit-product/edit-product.module';
import { ControlPanelModule } from '../control-panel/control-panel.module';

import { routes } from './manager.routes';

@NgModule({
  declarations: [
    ManagerComponent
  ],
  imports: [
    CommonModule,
    ProductListModule,
    OrderListModule,
    EditProductModule,
    ControlPanelModule,
    RouterModule.forChild(routes)
  ]
})
export class ManagerModule { }
