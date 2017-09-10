import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageUploadModule } from 'angular2-image-upload';

import { EditProductComponent } from './edit-product.component';

@NgModule({
  declarations: [
    EditProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ImageUploadModule.forRoot()
  ],
  exports: [
    EditProductComponent
  ]
})
export class EditProductModule { }
