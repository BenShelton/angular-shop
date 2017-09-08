import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as rootReducer from '../reducers';

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private store: Store<rootReducer.State>) { }

  create(payload) {
    return this.http.post(`/api/user/create`, payload);
  }

  load(payload) {
    return this.http.post(`/api/user/load`, payload);
  }

}
