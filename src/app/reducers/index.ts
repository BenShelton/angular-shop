import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as userReducer from './user';
import * as usersReducer from './users';
import * as cartReducer from './cart';
import * as productReducer from './product';
import * as orderReducer from './order';
import { User } from '../models/user';
import { Product } from '../models/product';
import { Order } from '../models/order';
import { createSelector } from 'reselect';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from '../../environments/environment';

export interface State {
  user: User;
  users: User[];
  cart: Product[];
  product: Product[];
  order: Order[];
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer.reducer,
  users: usersReducer.reducer,
  cart: cartReducer.reducer,
  product: productReducer.reducer,
  order: orderReducer.reducer
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['user', 'cart'], rehydrate: true })(reducer);
}

export const metaReducers: MetaReducer<State>[] = [localStorageSyncReducer];

export const getUserState = (state: State) => state.user;
export const getUser = createSelector(getUserState, userReducer.getUser);

export const getUsersState = (state: State) => state.users;
export const getUsers = createSelector(getUsersState, usersReducer.getUsers);

export const getCartState = (state: State) => state.cart;
export const getCart = createSelector(getCartState, cartReducer.getCart);

export const getProductState = (state: State) => state.product;
export const getProduct = createSelector(getProductState, productReducer.getProduct);

export const getOrderState = (state: State) => state.order;
export const getOrder = createSelector(getOrderState, orderReducer.getOrder);
