import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Order } from '../models/order';
import { Store } from '@ngrx/store';
import * as rootReducer from '../reducers';
import * as orderAction from '../actions/order';
import { User } from '../models/user';

@Component({
  selector: 'app-order-list',
  template: `
  <h1>Orders</h1>
  <table>
    <tr>
      <th>Order ID</th>
      <th>Items</th>
      <th>Total Price</th>
      <th>Order Status</th>
    </tr>
    <tr *ngFor="let order of orders$ | async">
      <td>{{ order.id }}</td>
      <td><p *ngFor="let item of order.items">{{ displayItem(item) }}</p></td>
      <td>{{ totalPrice(order.items) | currency:'USD':true }}</td>
      <td class="status">{{ order.status }}</td>
    </tr>
  </table>
  `,
  styles: [
    ':host { text-align: center; }',
    'table { width: 80%; margin: 0 auto; border-collapse: collapse; }',
    'th, td { border: 1px solid black; }',
    '.status:first-letter { text-transform: uppercase; }'
  ]
})
export class OrderListComponent implements OnInit, OnDestroy {

  public orders$: Observable<Order[]>;
  private alive = true;
  private user: User;

  constructor(private store: Store<rootReducer.State>) {
    this.store.select(rootReducer.getUser)
      .take(1)
      .subscribe(user => this.user = user);
      const payload = this.user.role && this.user.role !== 'user' ?
        { id: 'ALL' } :
        { id: this.user.id };
    this.store.dispatch(new orderAction.LoadOrderAction(payload));
    this.orders$ = this.store.select(rootReducer.getOrder)
      .takeWhile(() => this.alive);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.alive = false;
  }

  totalPrice(items) {
    return items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  }

  displayItem(item) {
    return `${item.quantity}x ${item.name}`;
  }

}
