import { Action } from '@ngrx/store';
import { type } from '../util';

export const ActionTypes = {
  LOAD_PRODUCT: type('[Product] Load Product'),
  LOAD_PRODUCT_SUCCESS: type('[Product] Load Product Success'),
  UPDATE_PRODUCT: type('[Product] Update Product'),
  UPDATE_PRODUCT_SUCCESS: type('[Product] Update Product Success'),
  UPDATE_STOCK: type('[Product] Update Stock'),
  UPDATE_STOCK_SUCCESS: type('[Product] Update Stock Success'),
  DELETE_PRODUCT: type('[Product] Delete Product'),
  DELETE_PRODUCT_SUCCESS: type('[Product] Delete Product Success'),
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

export class UpdateStockAction implements Action {
  readonly type = ActionTypes.UPDATE_STOCK;
  constructor(public payload: any) { }
}

export class UpdateStockSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_STOCK_SUCCESS;
  constructor(public payload: any) { }
}

export class DeleteProductAction implements Action {
  readonly type = ActionTypes.DELETE_PRODUCT;
  constructor(public payload: any) { }
}

export class DeleteProductSuccessAction implements Action {
  readonly type = ActionTypes.DELETE_PRODUCT_SUCCESS;
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
  | UpdateStockAction
  | UpdateStockSuccessAction
  | DeleteProductAction
  | DeleteProductSuccessAction
  | ServerFailAction;
