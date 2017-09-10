import { Action } from '@ngrx/store';
import { type } from '../util';

export const ActionTypes = {
  LOAD_USERS: type('[Users] Load Users'),
  LOAD_USERS_SUCCESS: type('[Users] Load Users Success'),
  SERVER_FAIL: type('[Users] Server Fail')
};

export class LoadUsersAction implements Action {
  readonly type = ActionTypes.LOAD_USERS;
  constructor(public payload: any) { }
}

export class LoadUsersSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_USERS_SUCCESS;
  constructor(public payload: any) { }
}

export class ServerFailAction implements Action {
  readonly type = ActionTypes.SERVER_FAIL;
  constructor(public payload: any) { }
}

export type Actions
  = LoadUsersAction
  | LoadUsersSuccessAction
  | ServerFailAction;
