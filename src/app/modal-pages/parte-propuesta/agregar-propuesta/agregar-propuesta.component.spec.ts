import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPropuestaComponent } from './agregar-propuesta.component';

describe('AgregarPropuestaComponent', () => {
  let component: AgregarPropuestaComponent;
  let fixture: ComponentFixture<AgregarPropuestaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarPropuestaComponent]
    });
    fixture = TestBed.createComponent(AgregarPropuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
