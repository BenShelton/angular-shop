import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-product',
  template: `
    <div class="product">
      <img [src]="product.imageUrl || '/assets/placeholder.png'" alt="No Image">
      <p class="name"><strong>{{ product.name }}</strong></p>
      <p class="price">Price: {{ product.price | currency:'USD':true }}</p>
      <p class="stock">Stock: {{ product.stock }}</p>
      <div *ngIf="!edit" class="shop-view">
        <label>Qty In Cart:</label>
        <input [(ngModel)]="product.quantity" name="quantity" type="number" step="1" min="0" class="quantity" />
        <br/>
        <p><b>Total: </b> {{ priceTotal() | currency:'USD':true }}</p>
        <button *ngIf="!inCart()" [disabled]="sameQty()" (click)="updateCart()">Add To Cart</button>
        <button *ngIf="inCart()" [disabled]="sameQty()" (click)="updateCart()">Update Cart</button>
      </div>
      <div *ngIf="edit" class="edit-view">
        <button (click)="editProduct()">Edit Product</button>
      </div>
    </div>
  `,
  styles: [
    ':host { border: 1px solid black; border-radius: 10px; flex: 1 0 350px; margin: 5px; }',
    'img { float: left; height: 200px; width: 200px; margin: 5px; }',
    'p, input, button { height: 40px; line-height: 40px; margin: 5px; }'
  ]
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  @Input() edit: boolean;
  @Output() 'onUpdate' = new EventEmitter<Product>();
  @Output() 'onEdit' = new EventEmitter<Product>();

  public originalQty: number;

  constructor() {
  }

  ngOnInit() {
    this.product.quantity = this.product.quantity;
    this.originalQty = this.product.quantity;
  }

  updateCart() {
    this.onUpdate.emit(this.product);
  }

  editProduct() {
    this.onEdit.emit(this.product);
  }

  sameQty() {
    return this.product.quantity === this.originalQty;
  }

  inCart() {
    return this.originalQty > 0;
  }

  priceTotal() {
    return this.product.quantity * this.product.price;
  }

}
