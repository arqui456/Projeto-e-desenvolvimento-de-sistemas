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
  funcionarios:IFuncionario[] = []
  displayedColumns = ['nome', 'username','acoes'] 
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
  navigateToDelete(funcionario:IFuncionario){
    this.funcionariosService.setFuncionario(funcionario);
    this.router.navigate(["dashboard/gerenciar-funcionarios/deletar"])
  }

}
