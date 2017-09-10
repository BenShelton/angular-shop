import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as rootReducer from '../reducers';
import * as userAction from '../actions/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

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

  constructor(
    private store: Store<rootReducer.State>,
    private route: ActivatedRoute,
    private router: Router,
    private toasterService: ToasterService
  ) {
    const id = route.snapshot.params.id;
    if (id) {
      this.store.select(rootReducer.getUsers)
        .take(1)
        .subscribe(users => {
          const match = users.filter(user => user.id === id);
          if (match.length === 1) {
            this.user.id = match[0].id;
            this.user.name = match[0].name;
            this.user.email = match[0].email;
            this.user.role = match[0].role;
          } else {
            this.toasterService.pop('error', 'User ID not found, try editing from the user list!');
            this.router.navigate(['/admin/users/list']);
          }
        });
    } else {
      this.store.select(rootReducer.getUser)
        .take(1)
        .subscribe(payload => {
          this.user.id = payload.id;
          this.user.name = payload.name;
          this.user.email = payload.email;
          this.user.role = payload.role;
        }
      );
    }
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
