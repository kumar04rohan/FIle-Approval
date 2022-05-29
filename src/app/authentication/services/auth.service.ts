import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../login/login.model';
import { registerModel } from '../register/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

  registerUser(body:registerModel) {
    const registerUrl = environment.APIs.registerUser;
    return new Promise((reslove) => {
      this.httpClient.post<registerModel>(registerUrl, body).subscribe(
      (res) => {
        console.log(res);
        reslove(res);
      }
    )}
    )
  }

  login(body:LoginModel) {
    const loginUrl = environment.APIs.loginUser
    return new Promise((resolve) => {
      this.httpClient.post<LoginModel>(loginUrl, body).subscribe(
      (res) => {
        console.log(res);
        sessionStorage.setItem("user", JSON.stringify(res));
        resolve(res);
      }
    )})
  }
}
