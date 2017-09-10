import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import * as usersAction from '../actions/users';
import { UsersService } from '../services/users.service';
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

@Injectable()
export class UsersEffects {

  @Effect()
  load$: Observable<Action> = this.actions$
    .ofType(usersAction.ActionTypes.LOAD_USERS)
    .debounceTime(300)
    // .map((action: usersAction.LoadUsersAction) => action.payload)
    .switchMap(payload => this.usersService.load(payload)
      .map(res => new usersAction.LoadUsersSuccessAction(res))
      .catch(err => of(new usersAction.ServerFailAction(err)))
    );

  @Effect({ dispatch: false })
  serverFail$: Observable<Action> = this.actions$
    .ofType(usersAction.ActionTypes.SERVER_FAIL)
    .map((action: usersAction.ServerFailAction) => action.payload)
    .do(payload => {
      this.toasterService.pop('error', 'Server Error', payload.error.message);
    }
  );

  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private router: Router,
    private toasterService: ToasterService,
    private store: Store<rootReducer.State>
  ) {
  }
}
