import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultComponent } from './consult.component';

describe('ConsultComponent', () => {
  let component: ConsultComponent;
  let fixture: ComponentFixture<ConsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
