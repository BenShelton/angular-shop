import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as rootReducer from '../reducers';
import * as userAction from '../actions/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
    ':host { text-align: center; }',
    'input, select { width: 80%; max-width: 160px; }',
    'label { display: inline-block; width: 20%; max-width: 80px; text-align: right; }',
    'input.ng-invalid.ng-touched { background: #FF5F49; }',
    'input.ng-valid.ng-touched { background: #C7FF8E; }',
    '.addresses > .address > input { background: white; }',
    're-captcha { display: inline-block; }'
  ]
})
export class RegisterComponent implements OnInit {

  public user = {
    name: <string> null,
    email: <string> null,
    password: <string> null,
    role: <string> 'user',
    billingAddress: {
      address1: null,
      address2: null,
      city: null,
      county: null,
      postcode: null
    },
    shippingAddress: {
      address1: null,
      address2: null,
      city: null,
      county: null,
      postcode: null
    },
    captcha: <any> null
  };

  public isAdmin = false;

  constructor(private store: Store<rootReducer.State>) {
    this.store.select(rootReducer.getUser)
      .take(1)
      .subscribe(payload => {
        if (payload.role === 'admin') {
          this.isAdmin = true;
          this.user.captcha = 'AdminCreated';
        }
      });
  }

  ngOnInit() {
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }

  autofillUser(event) {
    event.preventDefault();
    this.user.name = 'Ben';
    this.user.email = 'ben@test.com';
    this.user.password = 'password';
    this.user.role = 'admin';
  }

  copyAddress(event) {
    event.preventDefault();
    this.user.shippingAddress = this.user.billingAddress;
  }

  onSubmit() {
    this.store.dispatch(new userAction.CreateUserAction(this.user));
  }

}
