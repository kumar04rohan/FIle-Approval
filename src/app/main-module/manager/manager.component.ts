import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  tabs = [{name:'Pending Requests', url:'pending'}, {name:'Approved Requests', url:'approved'}, {name:'Denied Requests', url:'denied'}];
  activeLink = this.tabs[0].url;
  constructor() { }

  ngOnInit(): void {
  }

}
