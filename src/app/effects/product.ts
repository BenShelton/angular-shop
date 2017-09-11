import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import * as productAction from '../actions/product';
import { ProductService } from '../services/product.service';
import { ToasterService } from 'angular2-toaster';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';
import * as rootReducer from '../reducers';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class ProductEffects {

  @Effect()
  load$: Observable<Action> = this.actions$
    .ofType(productAction.ActionTypes.LOAD_PRODUCT)
    .debounceTime(300)
    .switchMap(payload => this.productService.load(payload)
      .map(res => new productAction.LoadProductSuccessAction(res))
      .catch(err => of(new productAction.ServerFailAction(err)))
    );

  @Effect()
  update$: Observable<Action> = this.actions$
    .ofType(productAction.ActionTypes.UPDATE_PRODUCT)
    .debounceTime(300)
    .map((action: productAction.UpdateProductAction) => action.payload)
    .switchMap(payload => this.productService.update(payload)
      .map(res => new productAction.UpdateProductSuccessAction(res))
      .catch(err => of(new productAction.ServerFailAction(err)))
    );

  @Effect({ dispatch: false })
  redirectUpdate$: Observable<Action> = this.actions$
    .ofType(productAction.ActionTypes.UPDATE_PRODUCT_SUCCESS)
    .map((action: productAction.UpdateProductSuccessAction) => action.payload)
    .do(payload => {
      this.toasterService.pop('success', 'Product Updated', `Shop is Updated`);
      this.router.navigate(['/admin/products/list']);
    }
  );

  @Effect()
  delete$: Observable<Action> = this.actions$
    .ofType(productAction.ActionTypes.DELETE_PRODUCT)
    .debounceTime(300)
    .map((action: productAction.DeleteProductAction) => action.payload)
    .switchMap(payload => this.productService.delete(payload)
      .map(res => new productAction.DeleteProductSuccessAction(res))
      .catch(err => of(new productAction.ServerFailAction(err)))
    );

  @Effect({ dispatch: false })
  redirectDelete$: Observable<Action> = this.actions$
    .ofType(productAction.ActionTypes.DELETE_PRODUCT_SUCCESS)
    .map((action: productAction.DeleteProductSuccessAction) => action.payload)
    .do(payload => {
      this.toasterService.pop('success', 'Product Deleted', `Shop is Updated`);
      this.router.navigate(['/admin/products/list']);
    }
  );

  @Effect({ dispatch: false })
  serverFail$: Observable<Action> = this.actions$
    .ofType(productAction.ActionTypes.SERVER_FAIL)
    .map((action: productAction.ServerFailAction) => action.payload)
    .do(payload => {
      this.toasterService.pop('error', 'Server Error', payload.error.message);
    }
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private router: Router,
    private toasterService: ToasterService
  ) {
  }
}
