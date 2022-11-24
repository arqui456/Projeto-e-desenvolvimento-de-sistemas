import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SidebarItem } from 'src/app/models/sidebar-item.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  visualizaMenu: boolean = true;

  @Input() itensList: SidebarItem[] = [{titulo: '', icone: '', linkTo: ''}];

  @ViewChild('sidebarMenu', { static: false }) sidebarMenu: ElementRef = new ElementRef('');

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    // this.sidebarMenu.nativeElement.style.visibility = 'hidden';
  }

  teste() {
    // colocar um debounce aqui 
    console.log('teste')
  }

  controleVisualizacaoMenu(): void {
    let displayStyle: string = (this.visualizaMenu) ? 'visible' : 'hidden';
    this.visualizaMenu = !this.visualizaMenu;
    // this.sidebarMenu.nativeElement.style.visibility = displayStyle;
  }

  logout() {
    this.router.navigate(['login']);
    this.userService.logout();
  }

}
