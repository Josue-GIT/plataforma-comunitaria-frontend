import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarQuejaComponent } from './agregar-queja.component';

describe('AgregarQuejaComponent', () => {
  let component: AgregarQuejaComponent;
  let fixture: ComponentFixture<AgregarQuejaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarQuejaComponent]
    });
    fixture = TestBed.createComponent(AgregarQuejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
