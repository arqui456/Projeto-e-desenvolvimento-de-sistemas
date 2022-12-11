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
    email: '',
    cpf:'',
    senha:''
  }
  constructor(private funcionariosService:FuncionariosService , private router:Router) { }

  ngOnInit(): void {
  }
  criarFuncionario(): void {
    this.funcionariosService.create(this.funcionario).subscribe(()=>{
      this.funcionariosService.showMessage('Operação executada com sucesso')
      this.router.navigate(["dashboard/gerenciar-funcionarios"])
    })
    
  }
  cancel(): void {
    this.router.navigate(["dashboard/gerenciar-funcionarios"])
  }
}
