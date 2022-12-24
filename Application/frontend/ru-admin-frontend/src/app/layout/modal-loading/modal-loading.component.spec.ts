import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLoadingComponent } from './modal-loading.component';

describe('ModalLoadingComponent', () => {
  let component: ModalLoadingComponent;
  let fixture: ComponentFixture<ModalLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalLoadingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
