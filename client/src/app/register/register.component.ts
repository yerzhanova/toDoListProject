import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _auth: AuthService,
              private _router: Router) { }
  registerUserData = {
    email: '',
    password: ''
  };
  isValidEmail = true;
  isValidPassword = true;
  notRegistered = false;
  errorMessage;
  ngOnInit() {

  }
  registerUser() {
    this.isValidEmail = true;
    this.isValidPassword = true;
    this.validateData();
    if (this.isValidEmail && this.isValidPassword) {
      this._auth.registerUser(this.registerUserData).subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', this.registerUserData.email);
          this._router.navigate(['/tasks']);
        },
        err => {
          this.errorMessage = err.error;
          this.notRegistered = true;
          console.log(err);
        }
      );
    }
    console.log(this.registerUserData);
  }
  validateData() {
    this.validateEmail(this.registerUserData.email);
    this.validatePassword(this.registerUserData.password);
  }
  validateEmail(email) {
    if (email === '') {
      this.isValidEmail = false;
    } else {
      this.isValidEmail = true;
    }
  }
  validatePassword(pass) {
    if (pass.length < 6) {
      this.isValidPassword = false;
    } else {
      this.isValidPassword = true;
    }
  }
}
