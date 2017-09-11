import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as rootReducer from '../reducers';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient, private store: Store<rootReducer.State>) { }

  load(payload) {
    return this.http.get(`/api/product/load`, payload);
  }

  update(payload) {
    return this.http.patch(`/api/product/update`, payload);
  }

  delete(payload) {
    return this.http.delete(`/api/product/delete/${payload.id}`, payload);
  }

}
