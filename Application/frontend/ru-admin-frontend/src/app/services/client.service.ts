import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clientFounded:boolean = false;

  constructor() { }
  get getClient(): Observable<boolean> {
    return of(this.clientFounded);
  }
  public setClient(){
    this.clientFounded = !this.clientFounded;
  }

}
