import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as rootReducer from '../reducers';

@Injectable()
export class OrderService {

  constructor(private http: HttpClient, private store: Store<rootReducer.State>) { }

  create(payload) {
    return this.http.post(`/api/order/create`, payload);
  }

  load(payload) {
    return this.http.get(`/api/order/load/${payload.id}`, payload);
  }

  update(payload) {
    return this.http.patch(`/api/order/update`, payload);
  }

  delete(payload) {
    return this.http.delete(`/api/order/delete/${payload.id}`, payload);
  }

}
