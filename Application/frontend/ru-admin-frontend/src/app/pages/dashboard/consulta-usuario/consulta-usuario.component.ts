import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-usuario',
  templateUrl: './consulta-usuario.component.html',
  styleUrls: ['./consulta-usuario.component.scss']
})
export class ConsultaUsuarioComponent implements OnInit {

  validatedUsed: boolean = false;
  cpfValue: string = "";

  constructor() { }

  ngOnInit(): void {
    this.validatedUsed = false;
  }

  cpfHandler(cpf: string) {
    this.cpfValue = cpf;
  }

  queryUserEvent() {
    this.validatedUsed = true;
    console.log(this.validatedUsed);

    if(this.validatedUsed) {
      
    }
  }

}
