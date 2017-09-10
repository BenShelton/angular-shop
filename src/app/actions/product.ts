import { Action } from '@ngrx/store';
import { type } from '../util';

export const ActionTypes = {
  LOAD_PRODUCT: type('[Product] Load Product'),
  LOAD_PRODUCT_SUCCESS: type('[Product] Load Product Success'),
  UPDATE_PRODUCT: type('[Product] Update Product'),
  UPDATE_PRODUCT_SUCCESS: type('[Product] Update Product Success'),
  DELETE_PRODUCT: type('[Product] Delete Product'),
  SERVER_FAIL: type('[Product] Server Fail')
};

export class LoadProductAction implements Action {
  readonly type = ActionTypes.LOAD_PRODUCT;
  constructor(public payload: any) { }
}

export class LoadProductSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_PRODUCT_SUCCESS;
  constructor(public payload: any) { }
}

export class UpdateProductAction implements Action {
  readonly type = ActionTypes.UPDATE_PRODUCT;
  constructor(public payload: any) { }
}

export class UpdateProductSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_PRODUCT_SUCCESS;
  constructor(public payload: any) { }
}

export class DeleteProductAction implements Action {
  readonly type = ActionTypes.DELETE_PRODUCT;
  constructor(public payload: any) { }
}

export class ServerFailAction implements Action {
  readonly type = ActionTypes.SERVER_FAIL;
  constructor(public payload: any) { }
}

export type Actions
  = LoadProductAction
  | LoadProductSuccessAction
  | UpdateProductAction
  | UpdateProductSuccessAction
  | DeleteProductAction
  | ServerFailAction;
