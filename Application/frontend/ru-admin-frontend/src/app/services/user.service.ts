import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of , BehaviorSubject} from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/IUser';
const apiUrlUser = environment.apiUrl + "/user";

type UserCredentials = {
  username: string,
  senha: string
}

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private httpClient: HttpClient) {}

  login(credentials: UserCredentials): Observable<any>{
      return this.httpClient.post<any>(apiUrlUser + "/login", credentials).pipe(
      tap((response) =>{
        if(!response.auth) return;
        localStorage.setItem('ru+_token', response["token"]);
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
    localStorage.removeItem('ru+_token');
  }

  get getLoggedInUser(): IUser {
    return localStorage.getItem('ru+_token')
    ? JSON.parse(localStorage.getItem('ru+_toke' ) || '{}')
    : null;
  }

  get getLoggedInUserId() : string {
    return localStorage.getItem('ru+_token')
    ? (JSON.parse(localStorage.getItem('ru+_token') || '{}') as IUser).id
    : "{}";
  }

  get getLoggedInUserToken() : string {
    return localStorage.getItem('ru+_token')
    ? JSON.parse(localStorage.getItem('ru+_token') || '{}')
    : "{}";
  }

  get getLoggedIn(): Observable<boolean> {
    return of(localStorage.getItem('ru+_token') ? true : false);
  }
  
}
