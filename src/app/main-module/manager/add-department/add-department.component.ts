import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {

  error = false;
  Form!:FormGroup;
  constructor(private httpService:HttpService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.Form = this.fb.group({
      department:['', [Validators.required]]
    })
  }

  addDepartment() {
    if(this.Form.valid) {
      const name = this.Form.get('department')?.value;
      this.httpService.addDepartment(name).subscribe(
        () => {
          alert(name+" added!");
          this.Form.reset();
          this.Form.controls['department'].setErrors(null);
        }
      );
    }
  }

}
