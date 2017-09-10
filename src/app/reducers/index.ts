import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as userReducer from './user';
import * as cartReducer from './cart';
import * as productReducer from './product';
import { User } from '../models/user';
import { Cart } from '../models/cart';
import { Product } from '../models/product';
import { createSelector } from 'reselect';
import { localStorageSync } from 'ngrx-store-localstorage';

export interface State {
  user: User;
  cart: Cart;
  product: Product[];
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer.reducer,
  cart: cartReducer.reducer,
  product: productReducer.reducer
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['user'], rehydrate: true })(reducer);
}

export const metaReducers: MetaReducer<State>[] = [localStorageSyncReducer];

export const getUserState = (state: State) => state.user;
export const getUser = createSelector(getUserState, userReducer.getUser);

export const getCartState = (state: State) => state.cart;
export const getCart = createSelector(getCartState, cartReducer.getCart);

export const getProductState = (state: State) => state.product;
export const getProduct = createSelector(getProductState, productReducer.getProduct);
