import { Component } from '@angular/core';
import { SidebarItem } from 'src/app/models/sidebar-item.model';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent { 

  userLoggedIn: boolean = true;

  constructor(public userService: UserService) {}

  sidebarList: SidebarItem[] = [
    {titulo: 'Página Inicial', icone: 'home', linkTo: 'dashboard/pagina-inicial'},
    {titulo: 'Consultar Usuário', icone: 'search', linkTo: 'dashboard/consultar-usuario'},
    {titulo: 'Gerar Relatório', icone: 'insert_drive_file', linkTo: 'dashboard/gerar-relatorio'},
    {titulo: 'Gerenciar Funcionários', icone: 'people', linkTo: 'dashboard/gerenciar-funcionarios'}, 
    {titulo: 'Enviar Base de Dados', icone: 'cloud_upload', linkTo: 'dashboard/enviar-base'},
  ];

  title = 'Restaurante Universitário - UFAL';

}

/* 
- Padronziar as fontes e tags voltadas para texto
- componente de input
- componente de botão suprindo as todas as "aparências" (com opção de ícones)
- ver qual biblioteca de ícones utilizar ou utilizar do fingma mesmo (https://fonts.google.com/icons?icon.query=close)
- componente de navbar
*/
