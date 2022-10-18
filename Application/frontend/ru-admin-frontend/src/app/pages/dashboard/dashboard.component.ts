import { Component, OnInit } from '@angular/core';
import { SidebarItem } from 'src/app/models/sidebar-item.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  sidebarList: SidebarItem[] = [
    {titulo: 'Página Inicial', icone: 'home', linkTo: ''},
    {titulo: 'Consultar Usuário', icone: 'search', linkTo: ''},
    {titulo: 'Gerar Relatório', icone: 'insert_drive_file', linkTo: ''},
    {titulo: 'Gerenciar Funcionários', icone: 'people', linkTo: ''}, 
    {titulo: 'Enviar Base de Dados', icone: 'cloud_upload', linkTo: ''},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
