import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { ActivatedRouteSnapshot,CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(private loginService:LoginService,private router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.loginService.isLoggedIn() &&  this.loginService.getUser() != null){
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
