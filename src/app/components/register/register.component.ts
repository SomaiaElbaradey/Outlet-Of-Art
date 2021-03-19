import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import {  Router } from '@angular/router';
import { FormControl, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  

  constructor(
     private RegisterService:RegisterService,
    private router: Router
  ) { }
  myForm = new FormGroup({
    username:new FormControl('',[Validators.required,Validators.minLength(4)]),
    email:new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password:new FormControl('',[Validators.required,Validators.minLength(6)]),
    gender:new FormControl('',[Validators.required])
  })
  ngOnInit(): void {
  }
  Register() {
    if(this.myForm.valid)
    {
      console.log(this.myForm.value)
      this.RegisterService.addUser(
        this.myForm.value,
      )
        .subscribe(
          response =>
          {
             console.log(response)
             this.router.navigateByUrl("/login")
            },
          err => alert(err.error)
        );
    }
    }
    login(){
      this.router.navigateByUrl("/login")
    }
}
