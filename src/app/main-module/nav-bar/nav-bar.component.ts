import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  manager!:boolean;
  constructor() { }

  ngOnInit(): void {
    this.manager =this.isManager();
  }

  getUserRole() {

    let sessionStorageUser:any = sessionStorage.getItem("user");
    if (sessionStorageUser) {
      const user = JSON.parse(sessionStorageUser);
      const rollId = user.User.role_id;
      return rollId
    }
    else {
      return null;
    }}

  isManager() {
    const rollID = this.getUserRole();
    if (rollID == 1) {
      return false;
    }
    else {
      return true;
    }
  }
}
