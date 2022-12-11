import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
const apiUrlUser = environment.apiUrl + "/cliente/update";
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private snackBar: MatSnackBar,private http: HttpClient) { }

  sendCsvDatabase(csvFile:File): Observable<any>{
    const headers = {
      'Content-Type': 'text/plain',
      'Accept':'aplication/json',
      'Authorization': 'Bearer ' + localStorage.getItem('ru+_token')!
    }
    let csv = new FormData();
    csv.append(csvFile.name, csvFile);

    return this.http.post<any>(apiUrlUser,csv, {headers}).pipe(
      tap((response) => {
        //console.log(response)
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
