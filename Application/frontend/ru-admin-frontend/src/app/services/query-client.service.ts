import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject, tap, map, catchError, EMPTY } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { IClient } from '../models/IClient';
import { IRefeicoes } from '../models/IRefeicoes';
const apiUrl = environment.apiUrl;

type cpfMatricula = { cpf?: string, matricula?: string };

@Injectable({providedIn: 'root'})
export class QueryClientService {
  private clientFounded:boolean = false;
  client!: IClient;
  
  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) { }

  queryClient(params: cpfMatricula): Observable<IClient>{ 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': `Bearer ${localStorage.getItem('ru+_token')}`
    });
    //if(isCpf) return this.httpClient.get<IClient>(`${apiUrl}?cpf=${cpfMatricula}`);
    //return this.httpClient.get<IClient>(`${apiUrl}?matricula=${cpfMatricula}`);
    return this.httpClient.get<IClient>(`${apiUrl}/cliente`, {params, headers});
  }

  registerMeal(clientId: string): Observable<IRefeicoes> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': `Bearer ${localStorage.getItem('ru+_token')}`
    });
    // return this.httpClient.post<any>(apiUrlUser + "/login", credentials).pipe(
    //   tap((response) =>{
    //     if(!response.auth) return;
    //     localStorage.setItem('ru+_token', response["token"]);
    //   }));
    return this.httpClient.get<IRefeicoes>(`${apiUrl}/refeicao/${clientId}/registrar-refeicao`, {headers}).pipe(
      map((obj) => {obj;
        this.showMessage('Refeição cadastrada com sucesso', false)
        this.setClient()
      }),
      catchError((e) => this.errorHandler(e)),
    );
  }

  get getClient(): Observable<boolean> {
    return of(this.clientFounded ? true : false);
  }
  get getNotClient(): Observable<boolean> {
    return of(this.clientFounded ? false : true);
  }
  public setClient(){
    this.clientFounded = !this.clientFounded;
  }
  public getClientData():Observable<IClient>{
    return of(this.client);
  }
  public setClientData(client:IClient){
    this.client = client
  }

  get getClientName():Observable<string>{
    return of(this.client.nome);
  }

  get getClientCpf():Observable<string>{
    return of(this.client.cpf);
  }

  get getClientMatricula():Observable<string>{
    return of(this.client.matricula);
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    })
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Refeição não cadastrada', true)
    return EMPTY
  }

}
