import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { FileUploadModel } from './file-upload.model';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  fileSelected = false;
  fileRef:any;
  percentage = '0%';
  uploadFile!:File;
  permission = "1";
  department!:number;
  role_id!:number;
  departmentList!:{name:string, id:number}[]
  constructor(private httpService:HttpService) { }

  ngOnInit(): void {
    this.role_id = this.getRoleId();
    this.httpService.getAllDepartment().subscribe(
      (res:any) => {
        if(res.FileTag){
          this.departmentList = res.FileTag;
          this.department = this.departmentList[0].id;
        }
      }
    )
  }

  getUserId() {
    let sessionStorageUser:any = sessionStorage.getItem("user");
    if (sessionStorageUser) {
      const user = JSON.parse(sessionStorageUser);
      const userId = user.id;
      return userId;
    }
    else {
      return null;
    }
  }

  getRoleId() {
    let sessionStorageUser:any = sessionStorage.getItem("user");
    if (sessionStorageUser) {
      const user = JSON.parse(sessionStorageUser);
      const userId = user.role_id;
      return userId;
    }
    else {
      return null;
    }
  }

  onFileSelected(event:any) {
    const file:File = event.target.files[0];
    console.log(file)
    this.fileRef = event.target;
        if (file) {

            this.uploadFile = file;
            this.fileSelected = true;
        }
        else {
          this.fileSelected = false;
        }
    }
  
  sendFile() {
    if (this.fileSelected) {
      const userId = this.getUserId();
      const permission = parseInt(this.permission);
      const uploadingFile = new FileUploadModel(this.uploadFile, userId, permission, this.department)
      this.httpService.pushFileToStorage(uploadingFile).subscribe({
        next: (percentage) => { 

            this.percentage = Math.round(percentage ? percentage : 0).toString() + '%';
            if (percentage == 100) {

              this.fileRef.value = null;
              this.permission = "1";
              this.department = 1;
              alert("File Uploaded!")
            }
        },
        error: (error) => {
          console.log(error);
        }
      })}
    else {
      alert("Select a file first!")
    }
}
}
