import { Action } from '@ngrx/store';
import { type } from '../util';

export const ActionTypes = {
  UPDATE_CART: type('[Cart] Update Cart'),
  SERVER_FAIL: type('[Cart] Server Fail')
};

export class UpdateCartAction implements Action {
  readonly type = ActionTypes.UPDATE_CART;
  constructor(public payload: any) { }
}

export class ServerFailAction implements Action {
  readonly type = ActionTypes.SERVER_FAIL;
  constructor(public payload: any) { }
}

export type Actions
  = UpdateCartAction
  | ServerFailAction;
