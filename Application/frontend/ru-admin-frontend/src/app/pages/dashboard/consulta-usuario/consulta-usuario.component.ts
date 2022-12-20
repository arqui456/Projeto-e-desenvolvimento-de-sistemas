import { IClient } from './../../../models/IClient';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QueryClientService } from 'src/app/services/query-client.service';

@Component({
  selector: 'app-consulta-usuario',
  templateUrl: './consulta-usuario.component.html',
  styleUrls: ['./consulta-usuario.component.scss']
})
export class ConsultaUsuarioComponent implements OnInit {

  validatedUsed: boolean = true;
  cpfValue: string = "";
  clientData: IClient = {
    cpf: '', matricula: '', nome: '', qtd_refeicoes_gratis: 0, refeicoes: [],
    ativo: false
  };

  constructor(private router: Router, public clientService: QueryClientService) { }

  ngOnInit(): void {
    this.validatedUsed = false;
  }

  cpfHandler(cpf: string) {
    this.cpfValue = cpf;
  }

  queryUserEvent() {
    this.clientService.setClient();
    console.log('aaaaaaa')
    this.clientService.queryClient({ cpf: this.cpfValue})
      .subscribe(data => {
        this.clientData = data;
        console.log(data);
    });
    this.clientService.setClientData(this.clientData);
  }

}
