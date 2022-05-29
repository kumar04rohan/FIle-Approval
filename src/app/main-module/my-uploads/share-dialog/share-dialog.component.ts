import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/app/services/http.service';
import { shareFileModel } from '../share_file.model';

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.css']
})
export class ShareDialogComponent implements OnInit {
  userList:any;
  userControl = new FormControl("", [Validators.required]);
  fileId!:number;
  constructor(
    @Inject(MAT_DIALOG_DATA)
        public data:any, private httpService:HttpService
  ) { }

  ngOnInit(): void {
    this.userList = this.data.userList;
    this.fileId = this.data.fileId;
  }

  share() {
    if (this.userControl.valid) {
      const userId = this.userControl.value;
      const shareFile = new shareFileModel(this.fileId, userId);
      this.httpService.shareFile(shareFile).then(
        (res => {
          console.log("shared", res)
        })
      )
      console.log(this.userControl.value, this.fileId, "share")
    }
  }
} 
