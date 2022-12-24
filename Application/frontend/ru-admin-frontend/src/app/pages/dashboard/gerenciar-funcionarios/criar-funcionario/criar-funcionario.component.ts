import { IFuncionario } from './../../../../models/IFuncionario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuncionariosService } from 'src/app/services/funcionarios.service';

@Component({
  selector: 'app-criar-funcionario',
  templateUrl: './criar-funcionario.component.html',
  styleUrls: ['./criar-funcionario.component.scss']
})
export class CriarFuncionarioComponent implements OnInit {
  funcionario: IFuncionario = {
    nome:'',
    username:'',
    senha:''
  }
  senhaRepetida: string='';
  hide: boolean = true;
  constructor(private funcionariosService:FuncionariosService , private router:Router) { }

  ngOnInit(): void {
  }
  
  criarFuncionario(): void {
    if(this.funcionario.nome.length > 1 && this.funcionario.username.length > 1 && this.funcionario.senha.length > 1 && this.senhaRepetida.length > 1){
      if(this.funcionario.senha.length > 7 && this.senhaRepetida.length > 7){
        if(this.funcionario.senha === this.senhaRepetida){
          this.funcionariosService.create(this.funcionario).subscribe(()=>{
            this.funcionariosService.showMessage('Operação executada com sucesso')
            this.router.navigate(["dashboard/gerenciar-funcionarios"])
          });
        }else{
          this.funcionariosService.showMessage('Erro: As senhas não estão iguais.',true,'center','bottom' );
        }
      }else{
        this.funcionariosService.showMessage('Erro: As senhas devem ter no mínimo 8 caracteres.',true,'center','bottom' );
      }
    }else{
      this.funcionariosService.showMessage('Erro: Preencha todos os campos corretamente.',true,'center','bottom' );
    }
  }
  cancel(): void {
    this.router.navigate(["dashboard/gerenciar-funcionarios"])
  }
}
