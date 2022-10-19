import { Component, Input, OnInit } from '@angular/core';
import { UsuarioRefeicao } from 'src/app/models/usuario-refeicao.model';

@Component({
  selector: 'app-valida-usuario',
  templateUrl: './valida-usuario.component.html',
  styleUrls: ['./valida-usuario.component.scss']
})
export class ValidaUsuarioComponent implements OnInit {

  @Input() usuario: UsuarioRefeicao = {id: '123456', nome: 'Fulano de Tal', cpf: '123456789', numeroMatricula: '123456789', refeicaoGratuita: true};

  constructor() { }

  ngOnInit(): void {
    this.setIconColor();
  }

  setIconColor() {
    // console.log('aquii')
    if(!this.usuario.refeicaoGratuita) {
      document.documentElement.style.setProperty('--icon-color', '#FFCC00');
    } else {
      document.documentElement.style.setProperty('--icon-color', 'rgba(6, 140, 11, 1)');
    }
  }

  //check_circle_outline
  // 'attach_money' : 'money_off'

  getUserIcon(): string {
    return (this.usuario.refeicaoGratuita) ? 'check_circle_outline' : 'attach_money';
  }

  getTextoRefeicao(): string {
    return (this.usuario.refeicaoGratuita) ? 'refeição gratuita!' : 'refeição paga!';
  }



}
