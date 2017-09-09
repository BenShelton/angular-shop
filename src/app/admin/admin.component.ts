import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  template: `
    <h1>Admin Control Panel</h1>
    <app-control-panel></app-control-panel>
  `,
  styles: [
    ':host { text-align: center; }'
  ]
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
