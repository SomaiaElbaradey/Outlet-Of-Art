import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { EventEmitterService } from '../../services/event-emitter.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private LoginService: LoginService,
    private router: Router,
    private eventEmitterService: EventEmitterService
  ) {}
  err = '';
  response: [];
  myForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  ngOnInit(): void {}
  Login() {
    if (this.myForm.valid) {
      this.LoginService.loginUser(this.myForm.value).subscribe(
        (res) => {
          localStorage.setItem('Token', res.token);
          localStorage.setItem('isAdmin', res.isAdmin);
          this.eventEmitterService.onLoginComponentButtonClick();
          this.router.navigateByUrl('/home');
        },
        (err) => {
          this.err = err.error;
        }
      );
    }
  }
  register() {
    this.router.navigateByUrl('/register');
  }
}
