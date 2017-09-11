import { Action } from '@ngrx/store';
import { User } from '../models/user';
import * as userAction from '../actions/user';

const initialState: User = {
  id: null,
  name: null,
  email: null,
  role: null
};

export function reducer(state = initialState, action: userAction.Actions): User {
  switch (action.type) {

    case userAction.ActionTypes.CREATE_USER_SUCCESS:
      return state.role === 'admin' ? state : action.payload;

    case userAction.ActionTypes.LOGIN_USER_SUCCESS:
      return action.payload;

    case userAction.ActionTypes.LOGOUT_USER:
      return initialState;

    case userAction.ActionTypes.UPDATE_USER_SUCCESS:
      return state.id === action.payload.id ? action.payload : state;

    case userAction.ActionTypes.DELETE_USER_SUCCESS:
      return state.id === action.payload.id ? initialState : state;

    default:
      return state;
  }
}

export const getUser = (state: User) => state;
