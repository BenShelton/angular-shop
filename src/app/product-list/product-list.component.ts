import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as rootReducer from '../reducers';
import * as productAction from '../actions/product';
import * as cartAction from '../actions/cart';
import { Product } from '../models/product';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-product-list',
  template: `
    <app-product
      *ngFor="let product of products$ | async"
      [product]="product"
      [edit]="edit"
      (onUpdate)="updateCart($event)"
      (onEdit)="editProduct($event)"
    >
    </app-product>
  `,
  styles: [
    ':host { display: flex; flex-flow: row wrap; max-width: 100%; }'
  ]
})
export class ProductListComponent implements OnInit, OnDestroy {

  public products$: Observable<Product[]>;
  public edit: boolean;
  public loading = true;
  private alive = true;

  constructor(private store: Store<rootReducer.State>, private router: Router) {
    this.store.dispatch(new productAction.LoadProductAction({}));
    this.products$ = this.store.select(rootReducer.getProduct)
      .takeWhile(() => this.alive);
    this.store.select(rootReducer.getUser)
      .take(1)
      .subscribe(user => this.edit = user.role !== 'user');
    this.loading = false;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.alive = false;
  }

  updateCart(product) {
    this.store.dispatch(new cartAction.UpdateCartAction(product));
  }

  editProduct(product) {
    this.router.navigate(['/admin/products/edit/', product.id]);
  }

}
