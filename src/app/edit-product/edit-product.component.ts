import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { Store } from '@ngrx/store';
import * as rootReducer from '../reducers';
import * as productAction from '../actions/product';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.html',
  styles: [
    '.delete { background: red; }'
  ]
})
export class EditProductComponent implements OnInit {

  public product: Product = {
    id: null,
    name: null,
    price: 0.01,
    stock: 0,
    imageUrl: null
  };
  public role: string;
  public title = 'Add New Product';
  private originalUrl: string;

  constructor(
    private store: Store<rootReducer.State>,
    private route: ActivatedRoute,
    private router: Router,
    private toasterService: ToasterService
  ) {
    const id = route.snapshot.params.id;
    if (id) {
      this.title = 'Product Editor';
      this.store.select(rootReducer.getUser)
        .take(1)
        .subscribe(user => {
          this.role = user.role;
        });
      this.store.select(rootReducer.getProduct)
        .take(1)
        .subscribe(products => {
          const match = products.filter(product => product.id === id);
          if (match.length === 1) {
            this.product = match[0];
            this.originalUrl = this.product.imageUrl;
          } else {
            this.toasterService.pop('error', 'Product ID not found, try editing from the product list!');
            this.router.navigate([`${this.role}/products/list`]);
          }
        });

    }
  }

  ngOnInit() {
  }

  onSubmit() {
    this.store.dispatch(new productAction.UpdateProductAction(this.product));
  }

  onDelete(event) {
    event.preventDefault();
    const res = confirm('Are you sure you want to delete?');
    if (res) {
      this.store.dispatch(new productAction.DeleteProductAction(this.product));
    }
  }

  imageUploaded(event) {
    this.product.imageUrl = `/api/image/${event.serverResponse.json().image.filename}`;
  }

  imageRemoved(event) {
    this.product.imageUrl = this.originalUrl;
    // remove image from server
  }

  canDelete() {
    return this.product.id && this.role === 'admin';
  }

}
