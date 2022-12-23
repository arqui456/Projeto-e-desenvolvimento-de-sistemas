import { IClient } from './../../../../models/IClient';
import { Component, Input, OnInit } from '@angular/core';
import { UsuarioRefeicao } from 'src/app/models/usuario-refeicao.model';
import { QueryClientService } from 'src/app/services/query-client.service';
import { QueryUserService } from 'src/app/services/query-user.service';

@Component({
  selector: 'app-valida-usuario',
  templateUrl: './valida-usuario.component.html',
  styleUrls: ['./valida-usuario.component.scss'],
})
export class ValidaUsuarioComponent implements OnInit {
  //TODO: contar tamanho da lista de refeições para selecionar pagantes e não pagantes
  @Input() usuario: IClient = {
    cliente_id: '123456',
    nome: 'Fulano de Tal',
    cpf: '123456789',
    matricula: '123456789',
    qtd_refeicoes_gratis: 0,
    ativo: false,
    refeicoes: [],
  };

  constructor(public clientService: QueryClientService) {}

  ngOnInit(): void {
    this.clientService.getClientData().subscribe((data) => {
      this.usuario = data;
    });
  }

  // retorna o ícone a ser utilizado na página de validação do usuário.
  getUserIcon(): string {
    let icon: string = '';

    if (this.usuario.qtd_refeicoes_gratis === -1) {
      icon = 'error_outline';
    } else if (this.usuario.qtd_refeicoes_gratis > 0) {
      icon = 'check_circle_outline';
    } else {
      icon = 'attach_money';
    }

    return icon;
  }

  getColor(): string {
    let cor: string = '';

    if (this.usuario.qtd_refeicoes_gratis === -1) {
      cor = 'erro';
    } else if (this.usuario.qtd_refeicoes_gratis > 0) {
      cor = 'gratis';
    } else {
      cor = 'paga';
    }

    return cor;
  }

  getTextoRefeicao(): string {
    let frase: string = '';

    if (this.usuario.qtd_refeicoes_gratis === -1) {
      frase = 'CPF não encontrado ou não cadastrado.';
    } else if (this.usuario.qtd_refeicoes_gratis > 0) {
      frase = 'refeição gratuita!';
    } else {
      frase = 'refeição a pagar!';
    }

    return frase;
  }

  voltar() {
    this.clientService.setClient();
  }
  enviar() {
    this.clientService
      .registerMeal(this.usuario.cliente_id!)
      .subscribe((data) => {});
  }
}
