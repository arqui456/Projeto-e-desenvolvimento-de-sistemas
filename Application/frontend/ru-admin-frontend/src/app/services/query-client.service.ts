import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of , BehaviorSubject} from 'rxjs';
import { environment } from 'src/environments/environment';
import { IClient } from '../models/IClient';
import { IRefeicoes } from '../models/IRefeicoes';
const apiUrl = environment.apiUrl;

type cpfMatricula = { cpf?: string, matricula?: string };

@Injectable({providedIn: 'root'})
export class QueryClientService {

  client!: IClient;
  
  constructor(private httpClient: HttpClient) { }

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
    return this.httpClient.get<IRefeicoes>(`${apiUrl}/?refeicao/${clientId}/registrar-refeicao`);
  }

}
