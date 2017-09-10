import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-control-panel',
  template: `
    <div class="control-panel">
      <div class="links">
        <div class="section">
          <h3>Products</h3>
          <a routerLink="./products/list" routerLinkActive="active">List</a>
          <a routerLink="./products/add" routerLinkActive="active">Add</a>
        </div>
        <div class="section">
          <h3>Orders</h3>
          <a routerLink="./orders/list" routerLinkActive="active">List</a>
        </div>
        <div class="section">
          <h3>Users</h3>
          <a routerLink="./users/list" routerLinkActive="active">List</a>
          <a routerLink="./users/add" routerLinkActive="active">Add</a>
        </div>
      </div>
      <div class="output">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [
    '.control-panel { display: flex; border: 1px solid grey; }',
    '.links { height: 800px; flex: 0 0 20%; background: #333; border-right: 1px solid grey; color: white; }',
    '.section { border-bottom: 1px solid white; }',
    `.section > a {
      background: grey;
      text-decoration: none;
      box-sizing: border-box;
      height: 40px;
      line-height: 40px;
      width: calc(100% - 10px);
      display: block;
      color: white;
      margin: 5px;
    }`,
    '.section > a.active { background: white; color: black; cursor: default; }',
    '.output { flex: 0 0 80%; overflow-y: scroll; }'
  ]
})
export class ControlPanelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
