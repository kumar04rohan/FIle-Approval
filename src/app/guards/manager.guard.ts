import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerGuard implements CanActivate {

  constructor(private router:Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.isManager()){
      return true;
    }
    else {
      this.router.navigate(['']);
      return false;
    }
  }
  
  getUserRole() {

    let sessionStorageUser:any = sessionStorage.getItem("user");
    if (sessionStorageUser) {
      const user = JSON.parse(sessionStorageUser);
      const rollId = user.User.role_id;
      return rollId
    }
    else {
      return null;
    }}

  isManager() {
    const rollID = this.getUserRole();
    if (rollID == 2) {
      return true;
    }
    else {
      return false;
    }
  }
}
