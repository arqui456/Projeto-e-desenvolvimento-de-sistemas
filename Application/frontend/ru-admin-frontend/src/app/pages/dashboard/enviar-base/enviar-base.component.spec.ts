import { ComponentFixture, TestBed } from '@angular/core/testing';


import { EnviarBaseComponent } from './enviar-base.component';

describe('EnviarBaseComponent', () => {
  let component: EnviarBaseComponent;
  let fixture: ComponentFixture<EnviarBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnviarBaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnviarBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
