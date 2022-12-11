import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFuncionarioComponent } from './editar-funcionario.component';

describe('EditarFuncionarioComponent', () => {
  let component: EditarFuncionarioComponent;
  let fixture: ComponentFixture<EditarFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarFuncionarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
