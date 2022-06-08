import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { sidebarElementModel, sidebarModel } from './sidebar.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user = false;
  sidebar:sidebarModel = new sidebarModel();
  constructor(private router:Router) { }

  ngOnInit(): void {
    if (this.user) {
      this.initSidebar();
    }
    else {
      this.initAdminSidebar();
    }
  }

  initSidebar() {
    this.sidebar.sidebarElements = [];

    const files = new sidebarElementModel("Internal Files", 'user/internal-files');
    this.sidebar.sidebarElements.push(files);

    const upload = new sidebarElementModel("Upload File", 'user/upload');
    this.sidebar.sidebarElements.push(upload);

    const my_upload = new sidebarElementModel("My Uploads", 'user/my-uploads');
    this.sidebar.sidebarElements.push(my_upload);

    const shared = new sidebarElementModel("Admin Shared Files", 'user/shared');
    this.sidebar.sidebarElements.push(shared);
  }

  initAdminSidebar() {
    this.sidebar.sidebarElements = [];
 
    const upload = new sidebarElementModel("Upload File", 'admin/upload');
    this.sidebar.sidebarElements.push(upload);

    const my_upload = new sidebarElementModel("My Uploads", 'admin/my-uploads');
    this.sidebar.sidebarElements.push(my_upload);

    const pending = new sidebarElementModel("Pending", 'admin/pending');
    this.sidebar.sidebarElements.push(pending);
    
    const approved = new sidebarElementModel("Approved", 'admin/approved');
    this.sidebar.sidebarElements.push(approved);

    const denied = new sidebarElementModel("Denied", 'admin/denied');
    this.sidebar.sidebarElements.push(denied);

    const shared = new sidebarElementModel("Shared", 'admin/shared');
    this.sidebar.sidebarElements.push(shared);

    const department = new sidebarElementModel("Add Department", 'admin/add-department');
    this.sidebar.sidebarElements.push(department);
  }

  navigate(url:string) {
    this.router.navigate([url]);
  }
}
