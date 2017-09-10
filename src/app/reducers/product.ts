import { Action } from '@ngrx/store';
import { Product } from '../models/product';
import * as productAction from '../actions/product';

const initialState: Product[] = [];

export function reducer(state = initialState, action: productAction.Actions): Product[] {
  switch (action.type) {

    case productAction.ActionTypes.LOAD_PRODUCT_SUCCESS:
      return action.payload;

    case productAction.ActionTypes.UPDATE_PRODUCT_SUCCESS:
      const index = state.map(product => product.id).indexOf(action.payload.id);
      return [
        ...state.slice(0, index),
        Object.assign({}, state[index], action.payload),
        ...state.slice(index + 1)
      ];

    default:
      return state;
  }
}

export const getProduct = (state: Product[]) => state;
