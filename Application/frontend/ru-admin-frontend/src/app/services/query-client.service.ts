import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of , BehaviorSubject} from 'rxjs';
import { environment } from 'src/environments/environment';
import { IClient } from '../models/IClient';
import { IRefeicoes } from '../models/IRefeicoes';
const apiUrl = environment.apiUrl;

type cpfMatricula = { cpf: string, matricula: string };

@Injectable({providedIn: 'root'})
export class QueryClientService {

  client!: IClient;
  
  constructor(private httpClient: HttpClient) { }

  queryClient(queryParams: cpfMatricula): Observable<IClient>{
    //if(isCpf) return this.httpClient.get<IClient>(`${apiUrl}?cpf=${cpfMatricula}`);
    //return this.httpClient.get<IClient>(`${apiUrl}?matricula=${cpfMatricula}`);
    return this.httpClient.get<IClient>(`${apiUrl}/cliente`, queryParams);
  }

  registerMeal(clientId: string): Observable<IRefeicoes> {
    return this.httpClient.get<IRefeicoes>(`${apiUrl}/?refeicao/${clientId}/registrar-refeicao`);
  }

}
