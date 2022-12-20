import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { IRelatorio } from '../models/IRelatorio';
const endpoint = environment.apiUrl + "/relatorio/por-aluno";

type rangeOfDates = { startDate?: string, endDate?: string };

@Injectable({ providedIn: 'root'})
export class GenReportService {
  snackBar: any;

  constructor(private http: HttpClient) { }

  getDailyReport(dates: rangeOfDates): Observable<any> {

    const headers = {
      'Authorization': 'Bearer ' + localStorage.getItem('ru+_token')!
    }

    return this.http.get(endpoint,{params: dates, headers, responseType: 'blob' as 'json'});
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro', true)
    return EMPTY
  }
  
  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    })
  }

}
