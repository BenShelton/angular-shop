import { Action } from '@ngrx/store';
import { Order } from '../models/order';
import * as orderAction from '../actions/order';

const initialState: Order[] = [];

export function reducer(state = initialState, action: orderAction.Actions): Order[] {
  switch (action.type) {

    case orderAction.ActionTypes.CREATE_ORDER_SUCCESS:
      return [...state.slice(0), action.payload];

    case orderAction.ActionTypes.LOAD_ORDER_SUCCESS:
      return action.payload;

    case orderAction.ActionTypes.UPDATE_ORDER_SUCCESS:
      const updateIndex = state.map(order => order.id).indexOf(action.payload.id);
      return [
        ...state.slice(0, updateIndex),
        Object.assign({}, state[updateIndex], action.payload),
        ...state.slice(updateIndex + 1)
      ];

    case orderAction.ActionTypes.DELETE_ORDER_SUCCESS:
      const deleteIndex = state.map(order => order.id).indexOf(action.payload.id);
      return [
        ...state.slice(0, deleteIndex),
        ...state.slice(deleteIndex + 1)
      ];

    default:
      return state;
  }
}

export const getOrder = (state: Order[]) => state;
