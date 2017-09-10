import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as rootReducer from '../reducers';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient, private store: Store<rootReducer.State>) { }

  load(payload) {
    return this.http.get(`/api/users/load`, payload);
  }

}
