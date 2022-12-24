import { IClient } from './../../../models/IClient';
import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryClientService } from 'src/app/services/query-client.service';
import { ModalLoadingComponent } from 'src/app/layout/modal-loading/modal-loading.component';

@Component({
  selector: 'app-consulta-usuario',
  templateUrl: './consulta-usuario.component.html',
  styleUrls: ['./consulta-usuario.component.scss'],
})
export class ConsultaUsuarioComponent implements OnInit {
  validatedUsed: boolean = true;
  registrationOrCpfValue: string = '';
  clientData: IClient = {
    cpf: '',
    matricula: '',
    nome: '',
    qtd_refeicoes_gratis: 0,
    refeicoes: [],
    ativo: false,
  };

  clientDataReset: IClient = {
    cpf: '',
    matricula: '',
    nome: '',
    qtd_refeicoes_gratis: -1,
    refeicoes: [],
    ativo: false,
  };

  @ViewChild('modalLoading', { static: false })
  modalLoading: ModalLoadingComponent = new ModalLoadingComponent();

  constructor(
    public clientService: QueryClientService
  ) {}

  ngOnInit(): void {
    //inicia a variável que faz o swap das telas com false
    this.validatedUsed = false;
  }

  registrationCpfHandler(cpf: string) {
    //função que recebe a cada atiualização o texto do input de cpf e número de matrícula
    this.registrationOrCpfValue = cpf;
  }

  handleUpdateClientData(data: IClient) {
    this.clientData = data;
    this.modalLoading.fechar();
  }

  queryUserEvent() {
    //limpa todos caracteres que não sejam números
    this.registrationOrCpfValue = this.registrationOrCpfValue.replace(/\D+/g,'');

    if(this.registrationOrCpfValue.length >= 11){
      this.clientService.setClient();
      this.modalLoading.abrir();
      this.clientService.queryClient({ cpf: this.registrationOrCpfValue.substring(0,11) }).subscribe({
        next: this.handleUpdateClientData.bind(this),
        error: () => {
          this.handleUpdateClientData(this.clientDataReset);
        },
      });
      this.clientService.setClientData(this.clientData);
    } else if (this.registrationOrCpfValue.length >= 8){
      this.clientService.setClient();
      this.modalLoading.abrir();
      this.clientService.queryClient({ matricula: this.registrationOrCpfValue.substring(0,8) }).subscribe({
        next: this.handleUpdateClientData.bind(this),
        error: () => {
          this.handleUpdateClientData(this.clientDataReset);
        },
      });
      this.clientService.setClientData(this.clientData);
    } else {
      this.clientService.showMessage('Erro: O valor descrito não é um cpf ou número de matrícula.',true,'center','bottom' );
    }
    
    
  }
}
