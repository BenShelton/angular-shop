import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as rootReducer from '../reducers';
import * as userAction from '../actions/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styles: [
    ':host { text-align: center; }',
    'input, select { width: 80%; max-width: 160px; }',
    'label { display: inline-block; width: 20%; max-width: 80px; text-align: right; }',
    'button { display: inline-block; } '
  ]
})
export class AccountComponent implements OnInit {

  public user = {
    id: <string> null,
    name: <string> null,
    email: <string> null,
    password: <string> null,
    role: <string> null
  };
  public editMode: Boolean = false;
  private alive = true;

  constructor(private store: Store<rootReducer.State>) {
    this.store.select(rootReducer.getUser)
      .take(1)
      .subscribe(payload => {
        this.user.id = payload.id;
        this.user.name = payload.name;
        this.user.email = payload.email;
        this.user.role = payload.role;
      });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.store.dispatch(new userAction.UpdateUserAction(this.user));
  }

  editUser(event) {
    event.preventDefault();
    this.editMode = true;
  }

}
