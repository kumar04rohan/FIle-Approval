import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { displayModel } from '../../landing-page/display.model';
import { ViewDialogComponent } from '../../my-uploads/view-dialog/view-dialog.component';
import { sharedDisplayModel } from './sharedDisplay.model';

@Component({
  selector: 'app-manager-shared',
  templateUrl: './manager-shared.component.html',
  styleUrls: ['./manager-shared.component.css']
})
export class ManagerSharedComponent implements OnInit {

  displayedColumns: string[] = ['name', 'shared_with', 'version', 'view'];
  dataSource!: sharedDisplayModel[];
  files:any;
  noFiles = true;
  isLoading = true;
  constructor(private httpService:HttpService, private dialog:MatDialog, private router:Router) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const userId = this.getUserInfo('id');
    this.httpService.getSharedAdminFile().then((res: any) => {
      console.log(res.SharedFile, "res");
      this.files = res.SharedFile;
      this.setDataSource();
      this.isLoading = false;
    });
  }

  setDataSource() {
    const dataSource = [];
    console.log(this.files.length, "len")
    if (this.files.length > 0) {
      this.noFiles = false;
      for (let data of this.files) {
        const status = this.getApprovalStatus(data.is_approved);
        const dataElement = {id: data.id, name:data.name,shared_with:data.username, version:data.version};
        dataSource.push(dataElement);
      }
      this.dataSource = dataSource;
    }
   else {
     this.noFiles = true;
   }
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


  getUserInfo(key: string) {
    let sessionStorageUser: any = sessionStorage.getItem('user');
    if (sessionStorageUser) {
      const user = JSON.parse(sessionStorageUser);
      const userInfo = user[key];
      return userInfo;
    } else {
      return null;
    }
  }

  openViewDialog(url: string) {
    const dialogRef = this.dialog.open(ViewDialogComponent, {
      data: { url:url },
    });
  }

  view(id:number) {

    this.router.navigate(['view/'+id])
  }
}
