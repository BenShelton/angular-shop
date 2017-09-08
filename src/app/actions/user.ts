import { Action } from '@ngrx/store';
import { type } from '../util';
import { User } from '../models/user';

export const ActionTypes = {
  CREATE_USER: type('[User] Create User'),
  CREATE_USER_SUCCESS: type('[User] Create User Success'),
  LOAD_USER: type('[User] Load User'),
  LOAD_USER_SUCCESS: type('[User] Load User Success'),
  UPDATE_USER: type('[User] Update User'),
  UPDATE_USER_SUCCESS: type('[User] Update User Success'),
  DELETE_USER: type('[User] Delete User'),
  DELETE_USER_SUCCESS: type('[User] Delete User Success'),
  LOGOUT_USER: type('[User] Logout User'),
  SERVER_FAIL: type('[User] Server Fail')
};

export class CreateUserAction implements Action {
  readonly type = ActionTypes.CREATE_USER;
  constructor(public payload: any) { }
}

export class CreateUserSuccessAction implements Action {
  readonly type = ActionTypes.CREATE_USER_SUCCESS;
  constructor(public payload: any) { }
}

export class LogoutUserAction implements Action {
  readonly type = ActionTypes.LOGOUT_USER;
  constructor(public payload: any) { }
}

export class ServerFailAction implements Action {
  readonly type = ActionTypes.SERVER_FAIL;
  constructor(public payload: any) { }
}

export type Actions
  = CreateUserAction
  | CreateUserSuccessAction
  | LogoutUserAction
  | ServerFailAction;
