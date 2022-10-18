import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LayoutModule } from '../layout/layout.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaginaInicialComponent } from './dashboard/pagina-inicial/pagina-inicial.component';
import { DashboardModule } from './dashboard/dashboard.module';



@NgModule({
  declarations: [
    LoginComponent,
    // DashboardComponent,
    // PaginaInicialComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    DashboardModule
  ],
  exports: [
    LoginComponent,
    DashboardComponent
  ]
})
export class PagesModule { }
