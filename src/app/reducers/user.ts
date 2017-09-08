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
      return action.payload;

    case userAction.ActionTypes.LOAD_USER_SUCCESS:
      return action.payload;

    case userAction.ActionTypes.LOGOUT_USER:
      return initialState;

    // case LOAD_USER_SUCCESS:
    //   return state;
    //
    // case UPDATE_USER:
    //   return state;
    //
    // case UPDATE_USER_SUCCESS:
    //   return state;
    //
    // case DELETE_USER:
    //   return state;
    //
    // case DELETE_USER_SUCCESS:
    //   return state;

    default:
      return state;
  }
}

export const getUser = (state: User) => state;
