import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as rootReducer from '../reducers';
import * as cartAction from '../actions/cart';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-list',
  template: `
    <app-product
      *ngFor="let product of products"
      [product]="product"
      (onUpdate)="updateCart($event)"
    >
    </app-product>
  `,
  styles: []
})
export class ProductListComponent implements OnInit {

  public products: Product[];

  constructor(private store: Store<rootReducer.State>) { }

  ngOnInit() {
  }

  updateCart(product) {
    this.store.dispatch(new cartAction.UpdateCartAction(product));
  }

}
