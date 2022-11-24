import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { DashboardComponent } from './dashboard.component';
import { LayoutModule } from 'src/app/layout/layout.module';
import { ConsultaUsuarioComponent } from './consulta-usuario/consulta-usuario.component';
import { ValidaUsuarioComponent } from './consulta-usuario/valida-usuario/valida-usuario.component';
import { CpfPipe } from 'src/app/pipes/cpf.pipe';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { EnviarBaseComponent } from './enviar-base/enviar-base.component';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { GerarRelatorioComponent } from './gerar-relatorio/gerar-relatorio.component';

@NgModule({
  declarations: [
    PaginaInicialComponent,
    DashboardComponent,
    ConsultaUsuarioComponent,
    ValidaUsuarioComponent,
    CpfPipe,
    EnviarBaseComponent,
    GerarRelatorioComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
  ],
  exports: [
    PaginaInicialComponent,
    DashboardComponent,
    ConsultaUsuarioComponent,
    // CpfPipe
  ]
})
export class DashboardModule { }
