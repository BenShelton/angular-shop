import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-product',
  template: `
    <div class="product">
      <img [src]="product.imageUrl">
      <span class="price">Price: {{ product.price }}</span>
      <span class="stock">Stock: {{ product.stock }}</span>
      <span class="quantity">Qty In Cart: {{ product.quantity }}</span>
      <button (click)="updateCart()">Add To Cart</button>
    </div>
  `,
  styles: [
    ':host { border: 1px solid black; border-radius: 10px; }'
  ]
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  @Output() 'onUpdate' = new EventEmitter<Product>();

  constructor() { }

  ngOnInit() {
  }

  updateCart() {
    this.onUpdate.emit(this.product);
  }

}
