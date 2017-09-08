import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <toaster-container></toaster-container>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {

}
