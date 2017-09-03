import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <nav>
      <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Home</a>
      <a routerLink="/shop" routerLinkActive="active">Shop</a>
      <a routerLink="/login" routerLinkActive="active">Login</a>
      <a routerLink="/account" routerLinkActive="active">Account</a>
      <a routerLink="/register" routerLinkActive="active">Register</a>
    </nav>
  `,
  styles: [
    'nav { height: 40px; }',
    '.active { background: yellow; }'
  ]
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
