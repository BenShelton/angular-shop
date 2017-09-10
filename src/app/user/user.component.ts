import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-user',
  template: `
    <h3>Name: {{ user.name }}</h3>
    <p>Email: {{ user.email }}</p>
    <p class="role">{{ user.role }}</p>
    <button (click)="editUser()">Edit</button>
  `,
  styles: [
    ':host { border: 1px solid black; border-radius: 5px; flex: 1 0 300px; margin: 5px; }',
    '.role:first-letter { text-transform: uppercase; }',
    'button { margin-bottom: 5px; height: 30px; width: 50px; }'
  ]
})
export class UserComponent implements OnInit {

  @Input() user: User;
  @Output() 'onEdit' = new EventEmitter<User>();

  constructor() { }

  ngOnInit() {
  }

  editUser() {
    this.onEdit.emit(this.user);
  }

}
