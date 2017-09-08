import { Action } from '@ngrx/store';
import { type } from '../util';
import { User } from '../models/user';

export const ActionTypes = {
  CREATE_USER: type('[User] Create User'),
  CREATE_USER_SUCCESS: type('[User] Create User Success'),
  LOGIN_USER: type('[User] Login User'),
  LOGIN_USER_SUCCESS: type('[User] Login User Success'),
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

export class LoginUserAction implements Action {
  readonly type = ActionTypes.LOGIN_USER;
  constructor(public payload: any) { }
}

export class LoginUserSuccessAction implements Action {
  readonly type = ActionTypes.LOGIN_USER_SUCCESS;
  constructor(public payload: any) { }
}

export class UpdateUserAction implements Action {
  readonly type = ActionTypes.UPDATE_USER;
  constructor(public payload: any) { }
}

export class UpdateUserSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_USER_SUCCESS;
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
  | LoginUserAction
  | LoginUserSuccessAction
  | UpdateUserAction
  | UpdateUserSuccessAction
  | LogoutUserAction
  | ServerFailAction;
