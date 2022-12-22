import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of , BehaviorSubject} from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/IUser';
import { SidebarItem } from '../models/sidebar-item.model';
const apiUrlUser = environment.apiUrl + "/user";

type UserCredentials = {
  username: string,
  senha: string
}
@Injectable({providedIn: 'root'})

export class UserService {
  constructor(private httpClient: HttpClient) {}

  private userPrivilege:boolean = false;
  private sidebarItens:SidebarItem[] = [];

  login(credentials: UserCredentials): Observable<any>{
      return this.httpClient.post<any>(apiUrlUser + "/login", credentials).pipe(
      tap((response) =>{
        if(!response.auth) return;
        localStorage.setItem('ru+_token', response["token"]);
        localStorage.setItem('ru+_user', response['user']['super_user']);
        this.userPrivilege = response['user']['super_user'];
      }));
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
  
  public getLoggedInBool(): Observable<boolean> {
    return of(localStorage.getItem('ru+_token') ? true : false);
  }

  public checkUserPrivilege(): Observable<boolean> {
    return of(localStorage.getItem('ru+_user')=='true');
  }

  public checkLocalUserPrivilege(): Observable<boolean> {
    return of(this.userPrivilege);
  }

  public setSidenavItens(sidebarItens:SidebarItem[]) {
    this.sidebarItens = sidebarItens;
  }

  public getSidenavItens(): Observable<SidebarItem[]> {
    let some:SidebarItem[]=[];
    this.checkUserPrivilege().subscribe(value =>{
      some = this.updateSidenav(value);
    })
    return of(some);
  }

  private updateSidenav(isPrivileged:boolean):SidebarItem[]{
    if(isPrivileged){
      return [
        {titulo: 'Gerar Relatório', icone: 'insert_drive_file', linkTo: 'dashboard/gerar-relatorio'},
        {titulo: 'Gerenciar Funcionários', icone: 'people', linkTo: 'dashboard/gerenciar-funcionarios'}, 
        {titulo: 'Enviar Base de Dados', icone: 'cloud_upload', linkTo: 'dashboard/enviar-base'},
      ];
    }
    else{
      return [
        {titulo: 'Consultar Usuário', icone: 'search', linkTo: 'dashboard/consultar-usuario'},
      ];
    }
  }
  
}
