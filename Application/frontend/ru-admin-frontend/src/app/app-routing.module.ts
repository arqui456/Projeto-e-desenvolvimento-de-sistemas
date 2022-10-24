import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PaginaInicialComponent } from './pages/dashboard/pagina-inicial/pagina-inicial.component';
import { ConsultaUsuarioComponent } from './pages/dashboard/consulta-usuario/consulta-usuario.component';
import { ValidaUsuarioComponent } from './pages/dashboard/consulta-usuario/valida-usuario/valida-usuario.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'dashboard/pagina-inicial', component: PaginaInicialComponent}, 
  { path: 'dashboard/consultar-usuario', component: ConsultaUsuarioComponent},
  { path: 'dashboard/consultar-usuario/valida-usuario', component:  ValidaUsuarioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
