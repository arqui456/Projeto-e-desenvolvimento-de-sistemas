import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
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
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GerarRelatorioComponent } from './gerar-relatorio/gerar-relatorio.component';
import { MatInputModule } from '@angular/material/input';
import { GerenciarFuncionariosComponent } from './gerenciar-funcionarios/gerenciar-funcionarios.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { CriarFuncionarioComponent } from './gerenciar-funcionarios/criar-funcionario/criar-funcionario.component';
import { MatCardModule } from '@angular/material/card';
import { DeletarFuncionarioComponent } from './gerenciar-funcionarios/deletar-funcionario/deletar-funcionario.component';
import { EditarFuncionarioComponent } from './gerenciar-funcionarios/editar-funcionario/editar-funcionario.component';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    PaginaInicialComponent,
    DashboardComponent,
    ConsultaUsuarioComponent,
    ValidaUsuarioComponent,
    CpfPipe,
    EnviarBaseComponent,
    GerarRelatorioComponent,
    GerenciarFuncionariosComponent,
    CriarFuncionarioComponent,
    DeletarFuncionarioComponent,
    EditarFuncionarioComponent,
  ],
  imports: [
    CommonModule,
    LayoutModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
  ],
  exports: [
    PaginaInicialComponent,
    DashboardComponent,
    ConsultaUsuarioComponent,
    // CpfPipe
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
})
export class DashboardModule {}
