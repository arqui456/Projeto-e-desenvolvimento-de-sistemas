import { Component, OnInit } from '@angular/core';
import { IFuncionario } from '../../../models/IFuncionario';

@Component({
  selector: 'app-gerenciar-funcionarios',
  templateUrl: './gerenciar-funcionarios.component.html',
  styleUrls: ['./gerenciar-funcionarios.component.scss']
})
export class GerenciarFuncionariosComponent implements OnInit {
  funcionarios:IFuncionario[] = []
  displayedColumns = ['id', 'name', 'price','action'] 
  constructor() { }

  ngOnInit(): void {
  }

}
