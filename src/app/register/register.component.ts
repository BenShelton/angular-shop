import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
    ':host { text-align: center; }',
    'input { width: 80%; max-width: 160px; }',
    'label { display: inline-block; width: 20%; max-width: 80px; text-align: right; }',
    'input.ng-invalid.ng-touched { background: #FF5F49; }',
    'input.ng-valid.ng-touched { background: #C7FF8E; }',
    're-captcha { display: inline-block; }'
  ]
})
export class RegisterComponent implements OnInit {

  user = {
    name: <string> null,
    email: <string> null,
    password: <string> null,
    role: <string> 'user',
    captcha: <any> null
  };

  constructor() { }

  ngOnInit() {
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }

  onSubmit() {
    console.log('submitted');
  }
}
