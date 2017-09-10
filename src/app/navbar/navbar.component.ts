import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as userAction from '../actions/user';
import * as rootReducer from '../reducers';
import { User } from '../models/user';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-navbar',
  template: `
    <nav>
      <a class="logo" routerLink="/"></a>
      <a *ngIf="isUser$ | async" routerLink="/shop" routerLinkActive="active">Shop</a>
      <a *ngIf="isManager$ | async" routerLink="/manager" routerLinkActive="active">Manager</a>
      <a *ngIf="isAdmin$ | async" routerLink="/admin" routerLinkActive="active">Admin</a>
      <div class="spacer"></div>
      <div class="link-container" *ngIf="loggedOut$ | async">
        <a routerLink="/login" routerLinkActive="active">Login</a>
        <a routerLink="/register" routerLinkActive="active">Register</a>
      </div>
      <div class="link-container" *ngIf="loggedIn$ | async">
        <a routerLink="/account" routerLinkActive="active">Account</a>
        <a role="button" (click)="logout()">Logout</a>
      </div>
    </nav>
  `,
  styles: [
    'nav { display: flex; flex-flow: row wrap; border-bottom: 1px solid grey; }',
    'a.active { color: grey; cursor: default; border: 1px solid grey; border-radius: 10px; }',
    `a {
      box-sizing: border-box;
      color: black;
      flex: 0 0 80px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      text-decoration: none;
      margin: 5px 0;
      cursor: pointer;
    }`,
    `.logo {
      background-image: url("/assets/fruit-logo.jpg");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }`,
    '.link-container { display: flex; flex: 0 1 160px; } ',
    '.spacer { flex: 1 0 auto; }'
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  public loggedIn$: Observable<boolean>;
  public loggedOut$: Observable<boolean>;
  public isUser$: Observable<boolean>;
  public isManager$: Observable<boolean>;
  public isAdmin$: Observable<boolean>;
  private alive = true;

  constructor(private store: Store<rootReducer.State>) {
    this.loggedIn$ = this.store.select(rootReducer.getUser)
      .takeWhile(() => this.alive)
      .map((user) => !!user.id);

    this.loggedOut$ = this.store.select(rootReducer.getUser)
      .takeWhile(() => this.alive)
      .map((user) => !user.id);

    this.isUser$ = this.store.select(rootReducer.getUser)
      .takeWhile(() => this.alive)
      .map((user) => user.role === 'user' || !user.role);

    this.isManager$ = this.store.select(rootReducer.getUser)
      .takeWhile(() => this.alive)
      .map((user) => user.role === 'manager');

    this.isAdmin$ = this.store.select(rootReducer.getUser)
      .takeWhile(() => this.alive)
      .map((user) => user.role === 'admin');
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.alive = false;
  }

  logout() {
    const user = this.store.select(rootReducer.getUser);
    this.store.dispatch(new userAction.LogoutUserAction(user));
  }

}
