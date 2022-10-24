import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of , BehaviorSubject} from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/IUser';
const apiUrlUser = environment.apiUrl + "User";

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private httpClient: HttpClient, 
              private router: Router) {}
  
  login(user: IUser): Observable<any>{
    /* return this.httpClient.post<any>(apiUrlUser + "/login", user).pipe(
      tap((response) =>{
        if(!response.sucess) return;
        localStorage.setItem('token', btoa(JSON.stringify(response["token"])));
        localStorage.setItem('user', btoa(JSON.stringify(response["user"])));
        this.router.navigate(['dashboard']);
      }));*/
      return this.mockUserLogin(user).pipe(tap((response) =>{
        if(!response.sucess) return;
        localStorage.setItem('token', btoa(JSON.stringify("Token")));
        localStorage.setItem('user', btoa(JSON.stringify(user)));
        this.router.navigate(['dashboard']);
      }));
  }

  private mockUserLogin(user: IUser): Observable<any> {
    var returnMock: any = [];
    if(user.email === "teste@ufal.com.br" && user.password === "123"){
      returnMock.sucess = true;
      returnMock.user = user;
      returnMock.token = "Token";
      return of(returnMock);
    }
    returnMock.sucess = false;
    returnMock.user = user;
    return of(returnMock);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  get getLoggedInUser(): IUser {
    return localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user' ) || '{}')
    : null;
  }

  get getLoggedInUserId() : string {
    return localStorage.getItem('user')
    ? (JSON.parse(localStorage.getItem('user' ) || '{}') as IUser).id
    : "{}";
  }

  get getLoggedInUserToken() : string {
    return localStorage.getItem('token')
    ? JSON.parse(localStorage.getItem('user' ) || '{}')
    : "{}";
  }

  get getLoggedIn(): Observable<boolean> {
    return of(localStorage.getItem('token') ? true : false);
  }
  
}
