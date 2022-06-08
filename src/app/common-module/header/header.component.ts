import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn = false;
  constructor(private router:Router, private sharedService:SharedService, private authService:AuthService) { }

  ngOnInit(): void {
    this.loggedIn = this.authService.isLoggedIn()
  }

  logout() {
    sessionStorage.removeItem('user');
    this.router.navigate(['']);
    this.authService.logout().then(
      () => {
        this.loggedIn = false;
      }
    )
  }

  login() {
    console.log("loggin in...")
    this.authService.signInWithGoogle().then(
      () => {
        this.loggedIn = true;
      }
    ) 
  }

  subscribe() {
    this.router.navigate(['subscribe'])
  }  
}
