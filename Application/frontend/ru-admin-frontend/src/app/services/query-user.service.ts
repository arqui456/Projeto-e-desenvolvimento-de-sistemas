import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of , BehaviorSubject} from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UsuarioRefeicao } from '../models/usuario-refeicao.model';
const apiUrl = environment.apiUrl + "Query";

@Injectable({providedIn: 'root'})
export class QueryUserService {

  user: UsuarioRefeicao = new UsuarioRefeicao();

  constructor(private httpClient: HttpClient,
              private router: Router) {}
  
  queryUser(user: UsuarioRefeicao): Observable<any>{
  /* return this.httpClient.post<any>(apiUrl + "/queryUser", user).pipe(
      tap((response) =>{
        if(!response.sucess) return;
        this.user.id = JSON.stringify(response["id"]);
        this.user.nome = JSON.stringify(response["nome"]);
        this.user.cpf = JSON.stringify(response["cpf"]);
        this.user.numeroMatricula = JSON.stringify(response["numeroMatricula"]);
        this.user.refeicaoGratuita = JSON.stringify(response["refeicaoGratuita"]); 
    }));*/
    return this.mockUsuarioRefeicao(user).pipe(tap((response) =>{
      if(!response.sucess) return;
      this.user = user;
    }));
  }

  private mockUsuarioRefeicao(user: UsuarioRefeicao): Observable<any> {
    var returnMock: any = [];
    if(user.id === "666" &&
      user.nome === "Danilo" &&
      user.cpf === "666.666.666-66" &&
      user.numeroMatricula === "666.666" &&
      user.refeicaoGratuita === false) {
        returnMock.sucess = true;
        returnMock.user = user;
        return of(returnMock);
      }
      returnMock.sucess = false;
      returnMock.user = user;
      return of(returnMock);
  } 
}


