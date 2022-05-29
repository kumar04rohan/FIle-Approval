import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  LoggedIn = new BehaviorSubject<boolean>(false);
  currentLoggedIn = this.LoggedIn.asObservable();
  constructor() { }
}
