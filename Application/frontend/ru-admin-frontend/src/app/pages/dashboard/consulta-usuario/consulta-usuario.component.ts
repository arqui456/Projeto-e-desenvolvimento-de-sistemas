import { IClient } from './../../../models/IClient';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
    public clientService: QueryClientService
  ) {}

  ngOnInit(): void {
    this.validatedUsed = false;
  }

  registrationCpfHandler(cpf: string) {
    console.log(cpf);
    this.registrationOrCpfValue = cpf;
  }

  handleUpdateClientData(data: IClient) {
    this.clientData = data;
    this.modalLoading.fechar();
  }

  queryUserEvent() {
    this.clientService.setClient();
    this.modalLoading.abrir();
    //TODO: limpar . e - da string e checar tamanho
    console.log(this.registrationOrCpfValue);
    this.registrationOrCpfValue = this.registrationOrCpfValue.replace(/\D+/g,'');
    console.log(this.registrationOrCpfValue);
    this.clientService.queryClient({ cpf: this.registrationOrCpfValue }).subscribe({
      next: this.handleUpdateClientData.bind(this),
      error: () => {
        this.handleUpdateClientData(this.clientDataReset);
      },
    });
    this.clientService.setClientData(this.clientData);
  }
}
