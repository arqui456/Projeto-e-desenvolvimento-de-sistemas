import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ButtonComponent } from './button/button.component';
import { IconComponent } from './icon/icon.component';
import { LogoComponent } from './logo/logo.component';
import {MatIconModule} from '@angular/material/icon';
import { ContainerConteudoComponent } from './container-conteudo/container-conteudo.component'



@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    IconComponent,
    LogoComponent,
    ContainerConteudoComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    InputComponent,
    ButtonComponent,
    IconComponent,
    LogoComponent,
    ContainerConteudoComponent
  ]
})
export class LayoutModule { }
