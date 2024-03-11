import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPropuestaComponent } from './editar-propuesta.component';

describe('EditarPropuestaComponent', () => {
  let component: EditarPropuestaComponent;
  let fixture: ComponentFixture<EditarPropuestaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarPropuestaComponent]
    });
    fixture = TestBed.createComponent(EditarPropuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
