import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletarFuncionarioComponent } from './deletar-funcionario.component';

describe('DeletarFuncionarioComponent', () => {
  let component: DeletarFuncionarioComponent;
  let fixture: ComponentFixture<DeletarFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletarFuncionarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletarFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
