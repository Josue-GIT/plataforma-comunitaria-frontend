import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarQuejaComponent } from './editar-queja.component';

describe('EditarQuejaComponent', () => {
  let component: EditarQuejaComponent;
  let fixture: ComponentFixture<EditarQuejaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarQuejaComponent]
    });
    fixture = TestBed.createComponent(EditarQuejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
