import { Action } from '@ngrx/store';
import { Product } from '../models/product';
import * as cartAction from '../actions/cart';

const initialState: Product[] = [];

export function reducer(state = initialState, action: cartAction.Actions): Product[] {
  switch (action.type) {

    case cartAction.ActionTypes.UPDATE_CART:
      const updateIndex = state.map(item => item.id).indexOf(action.payload.id);
      if (action.payload.quantity) {
        return [
          ...state.slice(0, updateIndex),
          Object.assign({}, state[updateIndex], action.payload),
          ...state.slice(updateIndex + 1)
        ];
      } else {
        return [
          ...state.slice(0, updateIndex),
          ...state.slice(updateIndex + 1)
        ];
      }

    case cartAction.ActionTypes.REFRESH_CART_SUCCESS:
      const copy = [...state.slice(0)];
      copy.forEach(item => {
        const copyIndex = action.payload.map(product => product.id).indexOf(item.id);
        Object.assign(item, action.payload[copyIndex]);
      });
      return copy;

    case cartAction.ActionTypes.EMPTY_CART:
      return initialState;

    default:
      return state;
  }
}

export const getCart = (state: Product[]) => state;
