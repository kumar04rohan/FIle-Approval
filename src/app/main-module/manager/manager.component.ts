import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
})
export class ManagerComponent implements OnInit {
  tabs = [
    { name: 'Upload File', url: 'upload' },
    {name:'Uploaded File', url:'my-uploads'},
    { name: 'Pending Requests', url: 'pending' },
    { name: 'Approved Requests', url: 'approved' },
    { name: 'Denied Requests', url: 'denied' },
    { name: 'Shared Files', url: 'shared' },
  ];
  activeLink = this.tabs[0].url;
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (window.innerWidth < 500) {
      this.sidebar = true;
    }
  }

  sidebar!:boolean;
  toggle = true;
  constructor() { }

  ngOnInit(): void {
    if (window.innerWidth < 500) {
      this.sidebar = true;
    }
  }
}
