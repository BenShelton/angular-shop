import { Action } from '@ngrx/store';
import { type } from '../util';

export const ActionTypes = {
  UPDATE_CART: type('[Cart] Update Cart'),
  REFRESH_CART: type('[Cart] Referesh Cart'),
  REFRESH_CART_SUCCESS: type('[Cart] Referesh Cart Success'),
  EMPTY_CART: type('[Cart] Empty Cart'),
  SERVER_FAIL: type('[Cart] Server Fail')
};

export class UpdateCartAction implements Action {
  readonly type = ActionTypes.UPDATE_CART;
  constructor(public payload: any) { }
}

export class RefreshCartAction implements Action {
  readonly type = ActionTypes.REFRESH_CART;
  constructor(public payload: any) { }
}

export class RefreshCartSuccessAction implements Action {
  readonly type = ActionTypes.REFRESH_CART_SUCCESS;
  constructor(public payload: any) { }
}

export class EmptyCartAction implements Action {
  readonly type = ActionTypes.EMPTY_CART;
  constructor(public payload: any) { }
}

export class ServerFailAction implements Action {
  readonly type = ActionTypes.SERVER_FAIL;
  constructor(public payload: any) { }
}

export type Actions
  = UpdateCartAction
  | RefreshCartAction
  | RefreshCartSuccessAction
  | EmptyCartAction
  | ServerFailAction;
