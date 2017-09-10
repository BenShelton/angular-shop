import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import * as userAction from '../actions/user';
import { UserService } from '../services/user.service';
import { ToasterService } from 'angular2-toaster';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';
import * as rootReducer from '../reducers';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/withLatestFrom';

const roleRedirect = {
  user: '/shop',
  manager: '/manager',
  admin: '/admin'
};

@Injectable()
export class UserEffects {

  @Effect()
  create$: Observable<Action> = this.actions$
    .ofType(userAction.ActionTypes.CREATE_USER)
    .debounceTime(300)
    .map((action: userAction.CreateUserAction) => action.payload)
    .switchMap(payload => this.userService.create(payload)
      .map(res => new userAction.CreateUserSuccessAction(res))
      .catch(err => of(new userAction.ServerFailAction(err)))
    );

  @Effect({ dispatch: false })
  redirectCreate$: Observable<Action> = this.actions$
    .ofType(userAction.ActionTypes.CREATE_USER_SUCCESS)
    .map((action: userAction.CreateUserSuccessAction) => action.payload)
    .do(payload => {
      this.store.select(rootReducer.getUser)
        .take(1)
        .subscribe(storePayload => {
          if (storePayload.role === 'admin') {
            this.toasterService.pop('success', 'User Created', `Account created for ${payload.name}`);
            this.router.navigate(['/admin/users/list']);
          } else {
            this.toasterService.pop('success', 'User Created', `Welcome ${payload.name}`);
            this.router.navigate([roleRedirect[storePayload.role]]);
          }
        });
    }
  );

  @Effect()
  login$: Observable<Action> = this.actions$
    .ofType(userAction.ActionTypes.LOGIN_USER)
    .debounceTime(300)
    .map((action: userAction.LoginUserAction) => action.payload)
    .switchMap(payload => this.userService.login(payload)
      .map(res => new userAction.LoginUserSuccessAction(res))
      .catch(err => of(new userAction.ServerFailAction(err)))
    );

  @Effect({ dispatch: false })
  redirectLogin$: Observable<Action> = this.actions$
    .ofType(userAction.ActionTypes.LOGIN_USER_SUCCESS)
    .map((action: userAction.LoginUserSuccessAction) => action.payload)
    .do(payload => {
      this.toasterService.pop('success', 'Logged In', `Welcome ${payload.name}`);
      this.router.navigate([roleRedirect[payload.role]]);
    }
  );

  @Effect()
  update$: Observable<Action> = this.actions$
    .ofType(userAction.ActionTypes.UPDATE_USER)
    .debounceTime(300)
    .map((action: userAction.UpdateUserAction) => action.payload)
    .switchMap(payload => this.userService.update(payload)
      .map(res => new userAction.UpdateUserSuccessAction(res))
      .catch(err => of(new userAction.ServerFailAction(err)))
    );

  @Effect({ dispatch: false })
  redirectUpdate$: Observable<Action> = this.actions$
    .ofType(userAction.ActionTypes.UPDATE_USER_SUCCESS)
    .map((action: userAction.UpdateUserSuccessAction) => action.payload)
    .do(payload => {
      this.store.select(rootReducer.getUser)
        .take(1)
        .subscribe(storePayload => {
          if (payload.id === storePayload.id) {
            this.toasterService.pop('success', 'Account Updated', `Details Changed`);
            this.router.navigate([roleRedirect[storePayload.role]]);
          } else {
            this.toasterService.pop('success', 'Account Updated', `Details Changed for ${payload.name}`);
            this.router.navigate(['/admin/users/list']);
          }
        });
    }
  );

  @Effect({ dispatch: false })
  redirectLogout$: Observable<Action> = this.actions$
    .ofType(userAction.ActionTypes.LOGOUT_USER)
    .do(() => this.router.navigate(['/login'])
  );

  @Effect({ dispatch: false })
  serverFail$: Observable<Action> = this.actions$
    .ofType(userAction.ActionTypes.SERVER_FAIL)
    .map((action: userAction.ServerFailAction) => action.payload)
    .do(payload => {
      this.toasterService.pop('error', 'Server Error', payload.error.message);
    }
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
    private toasterService: ToasterService,
    private store: Store<rootReducer.State>
  ) {
  }
}
