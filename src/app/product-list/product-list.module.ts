import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListComponent } from './product-list.component';
import { ProductComponent } from '../product/product.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductListComponent,
    ProductComponent
  ]
})
export class ProductListModule { }
