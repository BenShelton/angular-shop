import { Action } from '@ngrx/store';
import { Order } from '../models/order';
import * as orderAction from '../actions/order';

const initialState: Order[] = [];

export function reducer(state = initialState, action: orderAction.Actions): Order[] {
  switch (action.type) {

    case orderAction.ActionTypes.CREATE_ORDER_SUCCESS:
      return [...state.slice(0), action.payload];

    // case orderAction.ActionTypes.UPDATE_ORDER:
    //   const updateIndex = state.map(item => item.id).indexOf(action.payload.id);
    //   if (action.payload.quantity) {
    //     return [
    //       ...state.slice(0, updateIndex),
    //       Object.assign({}, state[updateIndex], action.payload),
    //       ...state.slice(updateIndex + 1)
    //     ];
    //   } else {
    //     return [
    //       ...state.slice(0, updateIndex),
    //       ...state.slice(updateIndex + 1)
    //     ];
    //   }

    default:
      return state;
  }
}

export const getOrder = (state: Order[]) => state;
