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
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css'],
})
export class SharedComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'version', 'status', 'view'];
  dataSource!: displayModel[];
  files:any;
  noFiles = true;
  constructor(private httpService: HttpService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const userId = this.getUserInfo('id');
    this.httpService.getShared(userId).then((res: any) => {
      console.log(res.SharedFile, "res");
      this.files = res.SharedFile;
      this.setDataSource();
    });
  }

  setDataSource() {
    const dataSource = [];
    console.log(this.files.length, "len")
    if (this.files.length > 0) {
      this.noFiles = false;
      for (let data of this.files) {
        const status = this.getApprovalStatus(data.is_approved);
        const dataElement = {id: data.id, name:data.name, version:data.version, status:status};
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

    this.httpService.getSpecificFileUrl(id)
    .then(
      (res:any) => {
        this.openViewDialog(res.File.path);
        console.log(res.File.path, "path")
      }
    )
  }
}
