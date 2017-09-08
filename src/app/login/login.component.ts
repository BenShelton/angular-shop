import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as rootReducer from '../reducers';
import * as userAction from '../actions/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    ':host { text-align: center; }',
    'input, select { width: 80%; max-width: 160px; }',
    'label { display: inline-block; width: 20%; max-width: 80px; text-align: right; }',
    'input.ng-invalid.ng-touched { background: #FF5F49; }',
    'input.ng-valid.ng-touched { background: #C7FF8E; }',
  ]
})
export class LoginComponent implements OnInit {

  user = {
    email: <string> null,
    password: <string> null
  };

  constructor(private store: Store<rootReducer.State>) { }

  ngOnInit() {
  }

  autofillUser() {
    this.user.email = 'ben@test.com';
    this.user.password = 'password';
  }

  onSubmit() {
    this.store.dispatch(new userAction.LoginUserAction(this.user));
  }

}
