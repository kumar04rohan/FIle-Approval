import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  sidebar = false;
  tabs = [{name:'Upload Files', url:'upload'}, {name:'My Uploads', url:'my-uploads'}, {name:'Shared Files', url:'shared'}];
  activeLink = this.tabs[0].url;
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (window.innerWidth < 500) {
      this.sidebar = true;
    }
  }

  toggle = true;
  constructor() { }

  ngOnInit(): void {
    if (window.innerWidth < 500) {
      this.sidebar = true;
    }
  }
}
