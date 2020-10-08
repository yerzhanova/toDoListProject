import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _auth: AuthService,
              private _router: Router) { }
  loginUserData = {
    email: '',
    password: ''
  };
  authError = false;
  ngOnInit() {
    if (localStorage.getItem('token')) {
      this._router.navigate(['/tasks']);
    }
  }
  loginUser() {
    this.authError = false;
    this._auth.loginUser(this.loginUserData).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', this.loginUserData.email);
        sessionStorage.setItem('id', res.id);
        this._router.navigate(['/tasks']);
      },
      err => {
        if (err.status === 401) {
          this.authError = true;
        }
        console.log(err);
      }
    );
  }
}
