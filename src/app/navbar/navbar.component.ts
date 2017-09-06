import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <nav>
      <a class="logo" routerLink="/"></a>
      <a routerLink="/shop" routerLinkActive="active">Shop</a>
      <div class="spacer"></div>
      <a routerLink="/login" routerLinkActive="active">Login</a>
      <a routerLink="/register" routerLinkActive="active">Register</a>
      <a routerLink="/account" routerLinkActive="active">Account</a>
    </nav>
  `,
  styles: [
    'nav { display: flex; flex-flow: row wrap; }',
    'a.active { color: grey; cursor: default; border: 1px solid grey; }',
    `a {
      box-sizing: border-box;
      color: black;
      flex: 0 0 80px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      text-decoration: none;
      margin: 5px 0;
    }`,
    `.logo {
      background-image: url("/assets/fruit-logo.jpg");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }`,
    '.spacer { flex: 1 0 auto; }'
  ]
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
