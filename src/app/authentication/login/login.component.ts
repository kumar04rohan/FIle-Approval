import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { AuthService } from '../services/auth.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm:any = new FormGroup({});
  matcher = new MyErrorStateMatcher();
  constructor(private fb:FormBuilder, private authService:AuthService, private router:Router, private sharedService:SharedService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {

    this.LoginForm = this.fb.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  login() {
    // console.log("login")
    // const loginCredentials = this.LoginForm.value;
    // if (this.LoginForm.valid) {
    //   this.authService.login(loginCredentials)
    //   .then(() => {
    //     if(this.isManager()){
    //       this.router.navigate(['manager/pending']);
    //     }
    //     else {
    //       this.router.navigate(['user/upload']);
    //     }
    //     this.sharedService.LoggedIn.next(true);
    //   }
    //   )
    // } 
  }

  getUserRole() {

    let sessionStorageUser:any = sessionStorage.getItem("user");
    if (sessionStorageUser) {
      const user = JSON.parse(sessionStorageUser);
      const rollId = user.User.role_id;
      return rollId
    }
    else {
      return null;
    }}

  isManager() {
    const rollID = this.getUserRole();
    if (rollID == 1) {
      return false;
    }
    else {
      return true;
    }
  }
}
