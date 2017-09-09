import { Action } from '@ngrx/store';
import { Cart } from '../models/cart';
import * as cartAction from '../actions/cart';

const initialState: Cart = {
  products: []
};

export function reducer(state = initialState, action: cartAction.Actions): Cart {
  switch (action.type) {

    case cartAction.ActionTypes.UPDATE_CART:
      return state;

    default:
      return state;
  }
}

export const getCart = (state: Cart) => state;
