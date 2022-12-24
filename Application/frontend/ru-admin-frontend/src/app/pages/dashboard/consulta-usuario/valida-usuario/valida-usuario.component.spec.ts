import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidaUsuarioComponent } from './valida-usuario.component';

describe('ValidaUsuarioComponent', () => {
  let component: ValidaUsuarioComponent;
  let fixture: ComponentFixture<ValidaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidaUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
