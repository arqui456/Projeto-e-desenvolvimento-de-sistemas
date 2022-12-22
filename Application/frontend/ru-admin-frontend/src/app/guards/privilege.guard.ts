import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeGuard implements CanActivate {

  constructor(private userService:UserService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let authorized:boolean = false;
      this.userService.checkLocalUserPrivilege().subscribe(value =>{
        authorized = value;
      })
      if(!authorized){
        this.router.navigate(['/login']);
      }
    return authorized;
  }
  
}
