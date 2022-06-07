import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.css']
})
export class MobileHeaderComponent implements OnInit {


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

  
  login() {
    console.log("loggin in...")
    // this.authService.signInWithGoogle()
  }
}
