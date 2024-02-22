import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEventoComponent } from './agregar-evento.component';

describe('AgregarEventoComponent', () => {
  let component: AgregarEventoComponent;
  let fixture: ComponentFixture<AgregarEventoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarEventoComponent]
    });
    fixture = TestBed.createComponent(AgregarEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
