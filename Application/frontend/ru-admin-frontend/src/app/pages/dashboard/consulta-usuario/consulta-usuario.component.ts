import { IClient } from './../../../models/IClient';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QueryClientService } from 'src/app/services/query-client.service';
import { ModalLoadingComponent } from 'src/app/layout/modal-loading/modal-loading.component';

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

  @ViewChild('modalLoading', { static: false })
  modalLoading: ModalLoadingComponent = new ModalLoadingComponent();

  constructor(private router: Router, public clientService: QueryClientService) { }

  ngOnInit(): void {
    this.validatedUsed = false;
  }

  cpfHandler(cpf: string) {
    this.cpfValue = cpf;
  }

  queryUserEvent() {
    this.clientService.setClient();
    this.modalLoading.abrir();
    this.clientService.queryClient({ cpf: this.cpfValue})
      .subscribe(data => {
        this.clientData = data;
        this.modalLoading.fechar();
    });
    this.clientService.setClientData(this.clientData);
  }

}
