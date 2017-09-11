import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import * as orderAction from '../actions/order';
import { OrderService } from '../services/order.service';
import { ToasterService } from 'angular2-toaster';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';
import * as rootReducer from '../reducers';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class OrderEffects {

  @Effect()
  create$: Observable<Action> = this.actions$
    .ofType(orderAction.ActionTypes.CREATE_ORDER)
    .debounceTime(300)
    .map((action: orderAction.CreateOrderAction) => action.payload)
    .switchMap(payload => this.orderService.create(payload)
      .map(res => new orderAction.CreateOrderSuccessAction(res))
      .catch(err => of(new orderAction.ServerFailAction(err)))
    );

  @Effect({ dispatch: false })
  redirectCreate$: Observable<Action> = this.actions$
    .ofType(orderAction.ActionTypes.CREATE_ORDER_SUCCESS)
    .map((action: orderAction.CreateOrderSuccessAction) => action.payload)
    .do(payload => {
      this.toasterService.pop('success', 'Order Placed', `We'll let you know when your order is shipped!`);
      this.router.navigate(['/orders']);
    }
  );

  @Effect({ dispatch: false })
  serverFail$: Observable<Action> = this.actions$
    .ofType(orderAction.ActionTypes.SERVER_FAIL)
    .map((action: orderAction.ServerFailAction) => action.payload)
    .do(payload => {
      this.toasterService.pop('error', 'Server Error', payload.error.message);
    }
  );

  constructor(
    private actions$: Actions,
    private orderService: OrderService,
    private router: Router,
    private toasterService: ToasterService
  ) {
  }
}
