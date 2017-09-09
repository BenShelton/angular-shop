import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  template: `
    <h1>Shop</h1>
    <app-product-list></app-product-list>
  `,
  styles: [
    ':host { text-align: center; }'
  ]
})
export class ShopComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
