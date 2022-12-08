import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarFuncionariosComponent } from './gerenciar-funcionarios.component';

describe('GerenciarFuncionariosComponent', () => {
  let component: GerenciarFuncionariosComponent;
  let fixture: ComponentFixture<GerenciarFuncionariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenciarFuncionariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarFuncionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
