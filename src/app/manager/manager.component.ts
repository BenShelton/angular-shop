import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager',
  template: `
    <h1>Manager Control Panel</h1>
    <app-control-panel [isAdmin]="false"></app-control-panel>
  `,
  styles: [
    ':host { text-align: center; }'
  ]
})
export class ManagerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
