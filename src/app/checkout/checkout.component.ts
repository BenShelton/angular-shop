import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Product } from '../models/product';
import { Store } from '@ngrx/store';
import * as rootReducer from '../reducers';
import * as orderAction from '../actions/order';
import * as cartAction from '../actions/cart';

@Component({
  selector: 'app-checkout',
  template: `
    <h1>Checkout</h1>
    <table>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Total</th>
      </tr>
      <tr *ngFor="let item of items$ | async">
        <td><img [src]="item.imageUrl"></td>
        <td>{{ item.name }}</td>
        <td>{{ item.quantity }}</td>
        <td>{{ item.price | currency:'USD':true }}</td>
        <td>{{ itemTotal(item) | currency:'USD':true }}</td>
      </tr>
    </table>
    <br/>
    <p class="total"><b>Grand Total: </b>{{ cartTotal() | async | currency:'USD':true }}</p>
    <button *ngIf="!userId"><a routerLink="/login">Login To Purchase</a></button>
    <button *ngIf="userId" (click)="openCheckout()">Purchase</button>
  `,
  styles: [
    ':host { text-align: center; }',
    'button, .total { display: block; width: 200px; margin: 10px 0 10px 70%; }',
    'img { width: 50px; height: 50px; }',
    'a { color: black; text-decoration: none; cursor: pointer; }',
    'table { width: 80%; margin: 0 auto; border-collapse: collapse; }',
    'th, td { border: 1px solid black; }',
    'th:first-child { border: none; }'
  ]
})
export class CheckoutComponent implements OnInit, OnDestroy {

  public items$: Observable<Product[]>;
  public userId: string;
  private alive = true;
  private items: Product[];

  constructor(private store: Store<rootReducer.State>) {
    this.store.dispatch(new cartAction.RefreshCartAction({}));
    this.items$ = this.store.select(rootReducer.getCart)
      .takeWhile(() => this.alive);
    this.store.select(rootReducer.getUser)
      .take(1)
      .subscribe(user => this.userId = user.id);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.alive = false;
  }

  itemTotal(item) {
    return item.quantity * item.price;
  }

  cartTotal() {
    return this.items$
      .takeWhile(() => this.alive)
      .map(items => items.reduce((acc, item) => acc + (item.quantity * item.price), 0));
  }

  openCheckout() {
    let amount: number;
    this.cartTotal()
      .take(1)
      .subscribe(payload => amount = payload * 100);
    this.items$
      .take(1)
      .subscribe(payload => this.items = payload);
    const handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_oi0sKPJYLGjdvOXOM8tE8cMa',
      locale: 'auto',
      token: ( function (token: any) {
          this.store.dispatch(new orderAction.CreateOrderAction({
            userId: this.userId,
            items: this.items,
            status: 'paid'
          }));
        }).bind(this)
    });
    handler.open({
      name: 'Fruit & Veg',
      email: 'test',
      description: 'Selection of Fruit',
      amount: amount
    });
  }

}
