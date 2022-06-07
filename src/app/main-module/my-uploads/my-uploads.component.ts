import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/app/services/http.service';
import { ShareDialogComponent } from './share-dialog/share-dialog.component';
import { ViewDialogComponent } from './view-dialog/view-dialog.component';

export interface displayModel {
  id: number;
  name: string;
  version: number;
  status: string;
  department: string;
}

@Component({
  selector: 'app-my-uploads',
  templateUrl: './my-uploads.component.html',
  styleUrls: ['./my-uploads.component.css'],
})
export class MyUploadsComponent implements OnInit {
  userID: any;
  files: any;
  displayedColumns: string[] = [
    'name',
    'version',
    'status',
    'department',
    'view_share'
  ];

  isLoading = true;
  isUser = true;
  dataSource!: displayModel[];
  userRole!: number;
  allUsers!: any[];
  viewDoc = false;
  doc = 'https://files.fm/down.php?i=axwasezb&n=SSaD.docx';
  noFiles = true;
  constructor(private httpService: HttpService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.userRole = this.getUserInfo('role_id');
    this.userID = this.getUserInfo('id');
    console.log(this.userID);
    this.getData();
    this.getAllUsers();
  }

  getData() {
    this.httpService.getFiles(this.userID).then((res: any) => {
      console.log(res);
      this.files = res.File;
      this.isLoading = false;
      if (this.files) {
        this.setDataSource();
      }
    });
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

  setDataSource() {
    const dataSource = [];
    console.log(this.files.length, 'len');
    if (this.files.length > 0) {
      this.noFiles = false;
      for (let data of this.files) {
        const status = this.getApprovalStatus(data.is_approved);
        const dataElement = {
          id: data.id,
          name: data.name,
          version: data.version,
          status: status,
          department: data.tag_id,
        };
        dataSource.push(dataElement);
      }
      this.dataSource = dataSource;
    } else {
      this.noFiles = true;
    }
  }

  getApprovalStatus(status: string | null) {
    if (status == null) {
      return 'Pending';
    } else if (status == 'True') {
      return 'Approved';
    } else {
      return 'Denied';
    }
  }

  getAllUsers() {
    this.httpService.getAllUsers().then((res: any) => {
      console.log(res);
      const myID = this.getUserInfo('id');
      console.log(res.User);
      this.allUsers = this.filterAllUsers(myID, res.User);
      console.log(this.allUsers, 'all');
    });
  }

  filterAllUsers(id: number, allUsers: any) {
    let allUsersList: {}[] = [];
    for (let user of allUsers) {
      if (user.id != id) {
        allUsersList.push(user);
      }
    }
    return allUsersList;
  }

  share(id: number) {
    console.log(id);
    this.openShareDialog(id);
  }

  openShareDialog(fileId: number) {
    this.getAllUsers();
    const dialogRef = this.dialog.open(ShareDialogComponent, {
      data: { userList: this.allUsers, fileId: fileId },
      height: '200px',
      width: '300px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }

  openViewDialog(url: string) {
    const dialogRef = this.dialog.open(ViewDialogComponent, {
      data: { url: url },
    });
  }

  view(id: number) {
    this.httpService.getSpecificFileUrl(id).then((res: any) => {
      this.openViewDialog(res.File.path);
      console.log(res.File.path, 'path');
    });
  }
}
