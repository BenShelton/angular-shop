import { Action } from '@ngrx/store';
import { type } from '../util';

export const ActionTypes = {
  CREATE_ORDER: type('[Order] Create Order'),
  CREATE_ORDER_SUCCESS: type('[Order] Create Order Success'),
  LOAD_ORDER: type('[Order] Load Order'),
  LOAD_ORDER_SUCCESS: type('[Order] Load Order Success'),
  UPDATE_ORDER: type('[Order] Update Order'),
  UPDATE_ORDER_SUCCESS: type('[Order] Update Order Success'),
  DELETE_ORDER: type('[Order] Delete Order'),
  DELETE_ORDER_SUCCESS: type('[Order] Delete Order Success'),
  SERVER_FAIL: type('[Order] Server Fail')
};

export class CreateOrderAction implements Action {
  readonly type = ActionTypes.CREATE_ORDER;
  constructor(public payload: any) { }
}

export class CreateOrderSuccessAction implements Action {
  readonly type = ActionTypes.CREATE_ORDER_SUCCESS;
  constructor(public payload: any) { }
}

export class LoadOrderAction implements Action {
  readonly type = ActionTypes.LOAD_ORDER;
  constructor(public payload: any) { }
}

export class LoadOrderSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_ORDER_SUCCESS;
  constructor(public payload: any) { }
}

export class UpdateOrderAction implements Action {
  readonly type = ActionTypes.UPDATE_ORDER;
  constructor(public payload: any) { }
}

export class UpdateOrderSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_ORDER_SUCCESS;
  constructor(public payload: any) { }
}

export class DeleteOrderAction implements Action {
  readonly type = ActionTypes.DELETE_ORDER;
  constructor(public payload: any) { }
}

export class DeleteOrderSuccessAction implements Action {
  readonly type = ActionTypes.DELETE_ORDER_SUCCESS;
  constructor(public payload: any) { }
}

export class ServerFailAction implements Action {
  readonly type = ActionTypes.SERVER_FAIL;
  constructor(public payload: any) { }
}

export type Actions
  = CreateOrderAction
  | CreateOrderSuccessAction
  | LoadOrderAction
  | LoadOrderSuccessAction
  | UpdateOrderAction
  | UpdateOrderSuccessAction
  | DeleteOrderAction
  | DeleteOrderSuccessAction
  | ServerFailAction;
