import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductListComponent } from './product-list.component';
import { ProductComponent } from '../product/product.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ProductListComponent,
    ProductComponent
  ]
})
export class ProductListModule { }
