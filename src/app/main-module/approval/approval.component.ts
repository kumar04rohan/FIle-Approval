import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/app/services/http.service';
import { ViewDialogComponent } from '../my-uploads/view-dialog/view-dialog.component';
  
export interface displayModel {
  id: number;
  name: string;
  version: number;
  status: string;
}

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {

    userID:any;
    files:any;
    displayedManagerColumn = ['name', 'version','view', 'approve', 'deny']
    dataSource!:displayModel[];
    userRoll!:number;
    isLoading = true;
    noFiles = true;
    constructor(private httpService:HttpService, public dialog: MatDialog) { }
  
    ngOnInit(): void {
      this.userRoll = this.getUserRole();
      this.userID = this.getUserId();
      console.log(this.userID)
      this.getData(); 
    }
  
    getUserRole() {
      let sessionStorageUser:any = sessionStorage.getItem("user");
      if (sessionStorageUser) {
        const user = JSON.parse(sessionStorageUser);
        const rollId = user.role_id;
        return rollId
      }
      else {
        return null;
      }
    }
  
    getData() {
      const rollID = this.getUserRole();
      this.httpService.getApprovalFiles()
      .then(
        (res:any) => {
          console.log(res);
          this.files = res.File;
          if (this.files.length > 0) {
            this.noFiles = false;
          }
          else {
            this.dataSource = this.getDataSource();
          }
          this.isLoading = false;
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
  
    getDataSource() {
      const dataSource = [];
      for (let data of this.files) {
        const status = this.getApprovalStatus(data.is_approved);
        const dataElement = {id: data.id, name:data.name, version:data.version, status:status};
        dataSource.push(dataElement);
      }
      return dataSource;
    }
  
  
    getApprovalStatus(status:string|null) {
      if (status == null) {
        return "Pending";
      }
      else if (status == "True"){
       return "Approved";
      }
      else {
        return "Denied"
      }
    }
  
    approve(id:number) {
      this.httpService.approveFile(id)
      .then(
        () => {
          this.getData();
        }
      )
    } 
  
    deny(id:number) {
      this.httpService.denyFile(id)
      .then(
        () => {
          this.getData();
        }
      )
    }

    openViewDialog(url: string) {
      const dialogRef = this.dialog.open(ViewDialogComponent, {
        data: { url:url },
      });
    }
  
    view(id:number) {
  
      this.httpService.getSpecificFileUrl(id)
      .then(
        (res:any) => {
          this.openViewDialog(res.File.path)
        }
      )
    }
  }
  
