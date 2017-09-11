import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <h1>Welcome to Fruit & Veg</h1>
    <p>Want some healthy food in your life? No problem!</p>
    <p>From the common to the obscure, we deliver straight to your door.</p>
    <br/>
    <p>Come visit our <a routerLink="/shop">Shop</a> and get healthier today!</p>
  `,
  styles: [
    ':host { text-align: center; }',
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
