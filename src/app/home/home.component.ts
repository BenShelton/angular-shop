import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <h1>Welcome to Fruit & Veg!</h1>
    <p>Want some healthy food in your life? No problem!</p>
    <p>See some of our best-sellers below:</p>
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
