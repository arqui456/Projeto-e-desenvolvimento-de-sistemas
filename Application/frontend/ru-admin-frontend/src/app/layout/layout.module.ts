import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ButtonComponent } from './button/button.component';
import { IconComponent } from './icon/icon.component';
import { LogoComponent } from './logo/logo.component';
import { MatIconModule } from '@angular/material/icon';
import { ContainerConteudoComponent } from './container-conteudo/container-conteudo.component';
import { SidebarComponent } from './sidebar/sidebar.component'
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ModalLoadingComponent } from './modal-loading/modal-loading.component';


@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    IconComponent,
    LogoComponent,
    ContainerConteudoComponent,
    SidebarComponent,
    ModalLoadingComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  exports: [
    InputComponent,
    ButtonComponent,
    IconComponent,
    LogoComponent,
    ContainerConteudoComponent,
    SidebarComponent,
    ModalLoadingComponent
  ]
})
export class LayoutModule { }
