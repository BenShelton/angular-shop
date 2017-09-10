import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { Store } from '@ngrx/store';
import * as rootReducer from '../reducers';
import * as usersAction from '../actions/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  template: `
    <app-user
      *ngFor="let user of users$ | async"
      [user]="user"
      (onEdit)="editUser($event)"
    >
    </app-user>
  `,
  styles: [
    ':host { display: flex; flex-flow: row wrap; }'
  ]
})
export class UserListComponent implements OnInit, OnDestroy {

  public users$: Observable<User[]>;
  private alive = true;

  constructor(private store: Store<rootReducer.State>, private router: Router) {
    this.store.dispatch(new usersAction.LoadUsersAction({}));
    this.users$ = this.store.select(rootReducer.getUsers)
      .takeWhile(() => this.alive);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.alive = false;
  }

  editUser(user) {
    this.router.navigate(['/admin/users/edit/', user.id]);
  }

}
