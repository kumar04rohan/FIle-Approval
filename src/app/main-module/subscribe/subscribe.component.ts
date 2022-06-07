import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpService } from 'src/app/services/http.service';

export class NewErrorStateMatcher implements ErrorStateMatcher {
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
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css'],
})
export class SubscribeComponent implements OnInit {
  SubscribeForm: any = new FormGroup({});
  matcher = new NewErrorStateMatcher();
  departmentList!: { name: string; id: number }[];
  constructor(private fb: FormBuilder, private httpService: HttpService) {}

  ngOnInit(): void {
    this.createSubscribeForm();
    this.httpService.getAllDepartment().subscribe((res: any) => {
      if (res.FileTag) {
        this.departmentList = res.FileTag;
      }
    });
  }

  createSubscribeForm() {
    this.SubscribeForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      department: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  subscribe() {
    if (this.SubscribeForm.valid) {
      const email = this.SubscribeForm.get('email').value;
      const tag_id = parseInt(this.SubscribeForm.get('department').value);
      this.httpService.subscribeDepartment({email:email, tag_id:tag_id}).subscribe(
        (res) => {
          this.SubscribeForm.reset();
          for (let name in this.SubscribeForm.controls) {
            this.SubscribeForm.controls[name].setErrors(null);
         }
         alert("Subscribed!");
        }
      )
    }
  }
}
