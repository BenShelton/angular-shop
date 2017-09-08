import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as userReducer from './user';
import { User } from '../models/user';
import { createSelector } from 'reselect';
import { localStorageSync } from 'ngrx-store-localstorage';

export interface State {
  user: User;
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer.reducer
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['user'], rehydrate: true })(reducer);
}

export const metaReducers: MetaReducer<State>[] = [localStorageSyncReducer];

export const getUserState = (state: State) => state.user;
export const getUser = createSelector(getUserState, userReducer.getUser);
