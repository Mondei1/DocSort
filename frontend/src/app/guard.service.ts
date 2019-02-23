import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private api: ApiService, private route: Router) { }

  canActivate() {
    if(this.api.isLoggedIn) return true;
    else {
      this.route.navigate(['login']);
      return false;
    } 
  }
}
