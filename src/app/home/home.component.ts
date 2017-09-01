import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <h1>Welcome to Knot-A-Shop!</h1>
    <p>Want the best quality knots? Not a problem!</p>
    <p>See some of our best-sellers below:</p>
  `,
  styles: []
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
