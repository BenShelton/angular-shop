import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import * as userAction from '../actions/user';
import { UserService } from '../services/user.service';
import { ToasterService } from 'angular2-toaster';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class UserEffects {

  // @Effect()
  // load$: Observable<Action> = this.actions$.ofType(data.ActionTypes.LOAD)
  //   .debounceTime(300)
  //   .map((action: data.UpdateAction) => action.payload)
  //   .switchMap(payload => this.dataService.load()
  //     .map(res => new data.LoadSuccessAction(res))
  //     .catch(err => of(new data.ServerFailAction(err)))
  //   );

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
      this.toasterService.pop('success', 'User Created', `Welcome ${payload.name}`);
      this.router.navigate(['/shop']);
    }
  );

  @Effect({ dispatch: false })
  redirectLogout$: Observable<Action> = this.actions$
    .ofType(userAction.ActionTypes.LOGOUT_USER)
    .do(authed => this.router.navigate(['/login'])
  );

  @Effect({ dispatch: false })
  serverError$: Observable<Action> = this.actions$
    .ofType(userAction.ActionTypes.LOGOUT_USER)
    .do(authed => this.router.navigate(['/login'])
  );

  //
  // @Effect({dispatch: false})
  // addFail$: Observable<Action> = this.actions$.ofType(data.ActionTypes.SERVER_FAIL)
  //   .debounceTime(300)
  //   .map((action: data.UpdateAction) => action.payload)
  //   .switchMap(payload => {
  //     this.toasterService.pop('error', 'Failure',
  //       isObject(payload.error) ? keys(
  //         mapKeys(payload.error, (value: Array<string>, key: string) => `${key}: ${value.join(';')}`)).join(';') :
  //         payload.error);
  //     return of(null);
  //   });
  //
  // @Effect()
  // remove$: Observable<Action> = this.actions$.ofType(data.ActionTypes.REMOVE)
  //   .debounceTime(300)
  //   .map((action: data.UpdateAction) => action.payload)
  //   .switchMap(payload => this.dataService.remove(payload)
  //     .map(res => new data.RemoveSuccessAction(payload))
  //     .catch(err => of(new data.ServerFailAction(err)))
  //   );
  //
  // @Effect()
  // update$: Observable<Action> = this.actions$.ofType(data.ActionTypes.UPDATE)
  //   .debounceTime(300)
  //   .map((action: data.UpdateAction) => action.payload)
  //   .switchMap(payload => this.dataService.update(payload)
  //     .map(res => new data.UpdateSuccessAction(res))
  //     .catch(err => of(new data.ServerFailAction(err)))
  //   );
  //
  // @Effect({dispatch: false})
  // refreshToken$: Observable<Action> = this.actions$.ofType(data.ActionTypes.REFRESH_TOKEN)
  //   .debounceTime(300)
  //   .switchMap(() => this.dataService.refreshToken().map(() => null));
  //

  // static get parameters() {
  //   return [[SweetAlertService]];
  // }

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
    private toasterService: ToasterService
  ) {
  }
}
