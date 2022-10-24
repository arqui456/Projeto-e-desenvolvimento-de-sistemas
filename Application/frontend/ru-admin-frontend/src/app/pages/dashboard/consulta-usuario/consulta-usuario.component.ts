import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-usuario',
  templateUrl: './consulta-usuario.component.html',
  styleUrls: ['./consulta-usuario.component.scss']
})
export class ConsultaUsuarioComponent implements OnInit {

  validatedUsed: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.validatedUsed = false;
  }

  queryUserEvent() {
    this.validatedUsed = true;
    console.log(this.validatedUsed);
  }

}
