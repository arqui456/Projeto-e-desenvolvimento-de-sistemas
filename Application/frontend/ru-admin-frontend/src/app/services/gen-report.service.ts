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

  getDailyReport(dates: rangeOfDates): Observable<IRelatorio> {

    const headers = {
      'Authorization': 'Bearer ' + localStorage.getItem('ru+_token')!
    }

    return this.http.get<IRelatorio>(endpoint,{params: dates, headers}).pipe(
      tap((response) => {
        console.log("Tentando resgatar relatorio diario")
      }),
      catchError((e) => this.errorHandler(e)),
    )
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
