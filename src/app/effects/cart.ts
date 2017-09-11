import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as cartAction from '../actions/cart';
import * as orderAction from '../actions/order';
import { ToasterService } from 'angular2-toaster';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';
import * as rootReducer from '../reducers';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class CartEffects {

  @Effect({ dispatch: false })
  redirectUpdate$: Observable<Action> = this.actions$
    .ofType(cartAction.ActionTypes.UPDATE_CART)
    .map((action: cartAction.UpdateCartAction) => action.payload)
    .do(payload => {
      this.toasterService.pop('success', 'Cart Updated', `${payload.quantity} ${payload.name}(s) in cart!`);
    }
  );

  @Effect()
  emptyCart$: Observable<Action> = this.actions$
    .ofType(orderAction.ActionTypes.CREATE_ORDER_SUCCESS)
    .map(payload => new cartAction.EmptyCartAction(payload)
  );

  constructor(
    private actions$: Actions,
    private toasterService: ToasterService
  ) {
  }
}
