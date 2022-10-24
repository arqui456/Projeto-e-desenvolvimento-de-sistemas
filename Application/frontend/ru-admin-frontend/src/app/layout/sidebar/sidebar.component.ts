import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SidebarItem } from 'src/app/models/sidebar-item.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  visualizaMenu: boolean = true;

  @Input() itensList: SidebarItem[] = [{titulo: '', icone: '', linkTo: ''}];

  @ViewChild('sidebarMenu', { static: false }) sidebarMenu: ElementRef = new ElementRef('');

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // this.sidebarMenu.nativeElement.style.visibility = 'hidden';
  }

  teste() {
    // colocar um debounce aqui 
    console.log('teste')
  }

  controleVisualizacaoMenu(): void {
    console.log('oi')
    let displayStyle: string = (this.visualizaMenu) ? 'visible' : 'hidden';
    this.visualizaMenu = !this.visualizaMenu;
    // this.sidebarMenu.nativeElement.style.visibility = displayStyle;
  }

  logout() {
    this.userService.logout();
  }

}
