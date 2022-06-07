import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { registerModel } from './register.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  managerList!:any;
  Form:any = new FormGroup({});

  phonePattern = '^[0-9]{10}$';

  matcher = new MyErrorStateMatcher();

  data = {
    email: 'something.123@gmail.com',
    username: 'Someone',
    phone_no: '8297676756',
    password: '78787sdas',
    role_id: 1,
    reports_to: 0,
  };
  constructor(private authService: AuthService, private httpService:HttpService, private fb:FormBuilder, private router:Router) {}

  ngOnInit(): void {
    this.createForm();
    this.httpService.getAllManagers().subscribe(
      (res) => {
        this.managerList = res.Manager;
        console.log(res)
      }
    )
  }

  createForm() {

    this.Form = this.fb.group({

      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      phone_no: ['', [Validators.required, Validators.pattern(this.phonePattern)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role_id: ['', [Validators.required]],
      reports_to: ['']
    })
  }

  formatPostBodyJSON() {
    const formData = this.Form.value;
    const data = {
      email: formData.email,
      username: formData.username,
      phone_no: formData.phone_no.toString(),
      password: formData.password,
      role_id: parseInt(formData.role_id),
      reports_to: parseInt(formData.reports_to == ""?"0":formData.reports_to)
    };
    return data;
  }

  registerUser() {
    console.log(this.Form.value);
  //   if (this.Form.valid) {
  //     const data = this.formatPostBodyJSON();
  //     this.authService.registerUser(data)
  //     .then (
  //       () => {
  //         this.router.navigate(['login']);
  //       }
  //     )
  //   }
  }
}
