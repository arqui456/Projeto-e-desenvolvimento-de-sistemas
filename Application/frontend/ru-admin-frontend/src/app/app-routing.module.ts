import { GerenciarFuncionariosComponent } from './pages/dashboard/gerenciar-funcionarios/gerenciar-funcionarios.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PaginaInicialComponent } from './pages/dashboard/pagina-inicial/pagina-inicial.component';
import { ConsultaUsuarioComponent } from './pages/dashboard/consulta-usuario/consulta-usuario.component';
import { ValidaUsuarioComponent } from './pages/dashboard/consulta-usuario/valida-usuario/valida-usuario.component';
import { EnviarBaseComponent } from './pages/dashboard/enviar-base/enviar-base.component';
import { GerarRelatorioComponent } from './pages/dashboard/gerar-relatorio/gerar-relatorio.component';
import { CriarFuncionarioComponent } from './pages/dashboard/gerenciar-funcionarios/criar-funcionario/criar-funcionario.component';
import { DeletarFuncionarioComponent } from './pages/dashboard/gerenciar-funcionarios/deletar-funcionario/deletar-funcionario.component';
import { EditarFuncionarioComponent } from './pages/dashboard/gerenciar-funcionarios/editar-funcionario/editar-funcionario.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'dashboard/pagina-inicial', component: PaginaInicialComponent}, 
  { path: 'dashboard/consultar-usuario', component: ConsultaUsuarioComponent},
  { path: 'dashboard/consultar-usuario/valida-usuario', component:  ValidaUsuarioComponent},
  { path: 'dashboard/enviar-base', component:  EnviarBaseComponent},
  { path: 'dashboard/gerar-relatorio', component:  GerarRelatorioComponent},
  { path: 'dashboard/gerenciar-funcionarios', component:  GerenciarFuncionariosComponent},
  { path: 'dashboard/gerenciar-funcionarios/criar', component:  CriarFuncionarioComponent},
  { path: 'dashboard/gerenciar-funcionarios/deletar/:funcionario_id', component:  DeletarFuncionarioComponent},
  { path: 'dashboard/gerenciar-funcionarios/editar/:funcionario_id', component:  EditarFuncionarioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
