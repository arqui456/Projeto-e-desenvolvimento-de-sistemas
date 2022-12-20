import { IClient } from './../../../../models/IClient';
import { Component, Input, OnInit } from '@angular/core';
import { UsuarioRefeicao } from 'src/app/models/usuario-refeicao.model';
import { QueryClientService } from 'src/app/services/query-client.service';
import { QueryUserService } from 'src/app/services/query-user.service';

@Component({
  selector: 'app-valida-usuario',
  templateUrl: './valida-usuario.component.html',
  styleUrls: ['./valida-usuario.component.scss']
})
export class ValidaUsuarioComponent implements OnInit {
  
  @Input() usuario: IClient = {
    cliente_id: '123456', nome: 'Fulano de Tal', cpf: '123456789', matricula: '123456789', qtd_refeicoes_gratis: 0,
    ativo: false,
    refeicoes: []
  };

  constructor(public clientService: QueryClientService) { }

  ngOnInit(): void {
    this.setIconColor();
    this.clientService.getClientData().subscribe(data =>{
      this.usuario = data;
    });
  }

  setIconColor() {
    // console.log('aquii')
    if(this.usuario.qtd_refeicoes_gratis > 0) {
      document.documentElement.style.setProperty('--icon-color', '#FFCC00');
    } else {
      document.documentElement.style.setProperty('--icon-color', 'rgba(6, 140, 11, 1)');
    }
  }

  //check_circle_outline
  // 'attach_money' : 'money_off'

  getUserIcon(): string {
    return (this.usuario.qtd_refeicoes_gratis <= 0) ? 'check_circle_outline' : 'attach_money';
  }

  getTextoRefeicao(): string {
    return (this.usuario.qtd_refeicoes_gratis > 0) ? 'refeição paga!' : 'refeição paga!';
  }

  voltar(){
    this.clientService.setClient();
  }
  enviar(){
    this.clientService.registerMeal(this.usuario.cliente_id!).subscribe(data => {

    });
  }

}
