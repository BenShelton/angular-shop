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

    default:
      return state;
  }
}

export const getCart = (state: Product[]) => state;
