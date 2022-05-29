import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  tabs = [{name:'Upload Files', url:'upload'}, {name:'My Uploads', url:'my-uploads'}, {name:'Shared Files', url:'shared'}];
  activeLink = this.tabs[0].url;
  constructor() { }

  ngOnInit(): void {
  }

}
