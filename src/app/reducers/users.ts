import { Action } from '@ngrx/store';
import { User } from '../models/user';
import * as usersAction from '../actions/users';

const initialState: User[] = [];

export function reducer(state = initialState, action: usersAction.Actions): User[] {
  switch (action.type) {

    case usersAction.ActionTypes.LOAD_USERS_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}

export const getUsers = (state: User[]) => state;
