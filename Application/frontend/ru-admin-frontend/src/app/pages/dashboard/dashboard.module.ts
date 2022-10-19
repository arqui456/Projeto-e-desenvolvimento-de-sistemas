import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { DashboardComponent } from './dashboard.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { ConsultaUsuarioComponent } from './consulta-usuario/consulta-usuario.component';
import { ValidaUsuarioComponent } from './consulta-usuario/valida-usuario/valida-usuario.component';
import { CpfPipe } from 'src/app/pipes/cpf.pipe';

@NgModule({
  declarations: [
    PaginaInicialComponent,
    DashboardComponent,
    ConsultaUsuarioComponent,
    ValidaUsuarioComponent,
    CpfPipe
  ],
  imports: [
    CommonModule,
    LayoutModule
  ],
  exports: [
    PaginaInicialComponent,
    DashboardComponent,
    ConsultaUsuarioComponent,
    // CpfPipe
  ]
})
export class DashboardModule { }
