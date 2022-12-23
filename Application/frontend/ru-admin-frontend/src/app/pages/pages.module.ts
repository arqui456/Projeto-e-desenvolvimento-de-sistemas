import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LayoutModule } from '../layout/layout.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaginaInicialComponent } from './dashboard/pagina-inicial/pagina-inicial.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
// import { CpfPipe } from '../pipes/cpf.pipe';

@NgModule({
  declarations: [
    LoginComponent,
    // CpfPipe
  ],
  imports: [
    CommonModule,
    LayoutModule,
    DashboardModule,
    RouterModule,
    MatIconModule,
    // CpfPipe
  ],
  exports: [
    LoginComponent,
    DashboardComponent,
    // CpfPipe
  ],
})
export class PagesModule {}
