import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerConteudoComponent } from './container-conteudo.component';

describe('ContainerConteudoComponent', () => {
  let component: ContainerConteudoComponent;
  let fixture: ComponentFixture<ContainerConteudoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerConteudoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerConteudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
