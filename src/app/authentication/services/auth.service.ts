import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginModel, LoginResponseModel } from '../login/login.model';
import { registerModel } from '../register/register.model';
import { getAuth, signOut, GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    public afAuth: AngularFireAuth,
    private router: Router
  ) {}

  login(body: LoginModel) {
    console.log(body, 'data');
    const loginUrl = environment.APIs.loginUser;
    return this.httpClient
      .post<LoginResponseModel>(loginUrl, body)
      .subscribe((res) => {
        console.log(res.User, 'adas');
        sessionStorage.setItem('user', JSON.stringify(res.User));
        if (res.User.role_id == 1) {
          this.router.navigate(['user/internal-files']);
        }
        else if (res.User.role_id == 2) {
          this.router.navigate(['admin/upload']);
        }
        else {
          console.error("Role invalid!")
        }
      });
  }

  signInWithGoogle() {
    return this.AuthLogin(new GoogleAuthProvider().setCustomParameters({prompt: 'select_account'}));
  }

  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!');
        if (result.user?.email && result.user?.displayName) {
          const credentials = new LoginModel(
            result.user?.email,
            result.user?.displayName
          );
          this.login(credentials);
        } else {
          console.error('Google signin failed!');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logout() {
    return this.afAuth.signOut()
    // return signOut(auth)
  }

  isLoggedIn() {
    if(sessionStorage.getItem('user')){
      return true;
    }
    else {
      return false;
    }
  }
}
