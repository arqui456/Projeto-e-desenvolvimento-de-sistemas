import { IFuncionario } from './../models/IFuncionario';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, map, Observable, of } from 'rxjs';
const apiUrlUser = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {

  funcionario: IFuncionario = {
    nome:'',
    username:'',
    senha:''
  }

  constructor(private snackBar: MatSnackBar,private http: HttpClient) { }
  sendCsvDatabase(csvFile:File){
    //console.log("chorei")
    return this.http.post<File>(apiUrlUser, csvFile).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e)),
    )
  }
  showMessage(msg: string, isError: boolean = false, hPosition:MatSnackBarHorizontalPosition = 'right', vPosition:MatSnackBarVerticalPosition = 'top'): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: hPosition,
      verticalPosition: vPosition,
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    })
  }
  create(product: IFuncionario): Observable<IFuncionario> {
    const headers = {
      'Authorization': 'Bearer ' + localStorage.getItem('ru+_token')!
    }
    return this.http.post<IFuncionario>(apiUrlUser + '/funcionario/cadastro',{product}, {headers}).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e)),
    )
  }
  read(): Observable<IFuncionario[]> {
    const headers = {
      'Authorization': 'Bearer ' + localStorage.getItem('ru+_token')!
    }
    return this.http.get<IFuncionario[]>(apiUrlUser + '/funcionarios', {headers}).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e)),
    )
  }
  readById(id: string): Observable<IFuncionario> {
    const url = `${apiUrlUser}/${id}`
    return this.http.get<IFuncionario>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e)),
    )
  }
  update(product: IFuncionario): Observable<IFuncionario> {
    const url = `${apiUrlUser}/${product.funcionario_id}`
    return this.http.put<IFuncionario>(url, product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e)),
    )
  }
  delete(id: string): Observable<IFuncionario> {
    const url = `${apiUrlUser}/${id}`
    return this.http.delete<IFuncionario>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e)),
    )
  }
  public setFuncionario(funcionario:IFuncionario){
    this.funcionario = funcionario;
  }
  public getFuncionario():Observable<IFuncionario>{
    return of(this.funcionario);
  }
  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro', true)
    return EMPTY
  }
}
