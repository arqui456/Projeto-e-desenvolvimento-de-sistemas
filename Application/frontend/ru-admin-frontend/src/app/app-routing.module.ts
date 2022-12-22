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
import { AuthorizedGuard } from './guards/authorized.guard';
import { PrivilegeGuard } from './guards/privilege.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthorizedGuard]},
  { path: 'dashboard/pagina-inicial', component: PaginaInicialComponent, canActivate:[AuthorizedGuard]}, 
  { path: 'dashboard/consultar-usuario', component: ConsultaUsuarioComponent, canActivate:[AuthorizedGuard]},
  { path: 'dashboard/consultar-usuario/valida-usuario', component:  ValidaUsuarioComponent, canActivate:[AuthorizedGuard]},
  { path: 'dashboard/enviar-base', component:  EnviarBaseComponent, canActivate:[AuthorizedGuard, PrivilegeGuard]},
  { path: 'dashboard/gerar-relatorio', component:  GerarRelatorioComponent, canActivate:[AuthorizedGuard, PrivilegeGuard]},
  { path: 'dashboard/gerenciar-funcionarios', component:  GerenciarFuncionariosComponent, canActivate:[AuthorizedGuard, PrivilegeGuard]},
  { path: 'dashboard/gerenciar-funcionarios/criar', component:  CriarFuncionarioComponent, canActivate:[AuthorizedGuard, PrivilegeGuard]},
  { path: 'dashboard/gerenciar-funcionarios/deletar/:funcionario_id', component:  DeletarFuncionarioComponent, canActivate:[AuthorizedGuard, PrivilegeGuard]},
  { path: 'dashboard/gerenciar-funcionarios/editar/:funcionario_id', component:  EditarFuncionarioComponent, canActivate:[AuthorizedGuard, PrivilegeGuard]},
  { path: '**', redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
