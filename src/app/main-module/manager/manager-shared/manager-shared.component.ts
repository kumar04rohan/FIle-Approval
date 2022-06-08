import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { displayModel } from '../../landing-page/display.model';
import { ViewDialogComponent } from '../../my-uploads/view-dialog/view-dialog.component';

@Component({
  selector: 'app-manager-shared',
  templateUrl: './manager-shared.component.html',
  styleUrls: ['./manager-shared.component.css']
})
export class ManagerSharedComponent implements OnInit {

  displayedColumns: string[] = ['name', 'shared_with', 'version', 'view'];
  dataSource!: displayModel[];
  files:any;
  noFiles = true;
  isLoading = true;
  constructor(private httpService:HttpService, private dialog:MatDialog, private router:Router) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const userId = this.getUserInfo('id');
    this.httpService.getApprovedManagerFile().then((res: any) => {
      console.log(res.File, "resapp");
      this.files = res.File;
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
        const dataElement = {id: data.id, name:data.name, version:data.version, department:data.tag_id};
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
