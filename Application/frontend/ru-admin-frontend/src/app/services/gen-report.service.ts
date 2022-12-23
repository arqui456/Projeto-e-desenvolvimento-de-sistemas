import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { catchError, EMPTY, map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
const endpoint = environment.apiUrl + "/relatorio/por-aluno";

type rangeOfDates = { startDate?: string, endDate?: string };

@Injectable({ providedIn: 'root'})
export class GenReportService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  getDailyReport(dates: rangeOfDates): Observable<any> {

    const headers = {
      'Authorization': 'Bearer ' + localStorage.getItem('ru+_token')!
    }

    return this.http.get(endpoint,{params: dates, headers, responseType: 'blob' as 'json'}).pipe(
      map((obj) => {
        this.showMessage('Relatório gerado com sucesso', false)
      }),
      catchError((e) => this.errorHandler(e)),
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Erro: Não foi possível gerar o relatório.', true,'center','bottom');
    return EMPTY
  }
  
  showMessage(msg: string, isError: boolean = false, hPosition:MatSnackBarHorizontalPosition = 'right', vPosition:MatSnackBarVerticalPosition = 'top'): void {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: hPosition,
      verticalPosition: vPosition,
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    })
  }
}
