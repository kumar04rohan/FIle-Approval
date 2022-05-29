import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn = false;
  constructor(private router:Router, private sharedService:SharedService) { }

  ngOnInit(): void {
    this.sharedService.currentLoggedIn.subscribe(
      (status) => {
        this.loggedIn = status;
      }
    )
  }

  logout() {
    sessionStorage.removeItem('user');
    this.router.navigate(['']);
    this.sharedService.LoggedIn.next(false);
  }
}
