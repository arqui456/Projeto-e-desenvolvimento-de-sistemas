import { Router } from '@angular/router';
import { FuncionariosService } from './../../../services/funcionarios.service';
import { IFuncionario } from './../../../models/IFuncionario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gerenciar-funcionarios',
  templateUrl: './gerenciar-funcionarios.component.html',
  styleUrls: ['./gerenciar-funcionarios.component.scss']
})
export class GerenciarFuncionariosComponent implements OnInit {
  funcionarios:IFuncionario[] = [{
    funcionario_id: '1',
    nome:"alguém",
    cpf:"12312312312",
    email:"algo1231312@gmail.com",
    senha:"alguma senha"
  },]
  displayedColumns = ['nome', 'email','acoes'] 
  constructor(private funcionariosService:FuncionariosService, private router:Router) { }

  ngOnInit(): void {
    this.funcionariosService.read().subscribe(funcionarios=>{
      this.funcionarios = funcionarios
      console.log(funcionarios)
    })
  }
  navigateToCriarFuncionario(){
    this.router.navigate(["dashboard/gerenciar-funcionarios/criar"])
  }

}
