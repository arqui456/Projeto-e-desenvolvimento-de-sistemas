import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { DashboardComponent } from './dashboard.component';
import { LayoutModule } from 'src/app/layout/layout.module';

@NgModule({
  declarations: [
    PaginaInicialComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    LayoutModule
  ],
  exports: [
    PaginaInicialComponent,
    DashboardComponent
  ]
})
export class DashboardModule { }
