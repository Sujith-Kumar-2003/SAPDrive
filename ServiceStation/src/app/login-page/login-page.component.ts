import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  title = 'ServiceStation';
  username = ''
  password = ''

  constructor(private router: Router) { }


  checkLogin(event: Event) {
    event.preventDefault();
      if(this.username == "admin" && this.password == "admin") {
        this.router.navigate(['main'])
      }
  }
}
