import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesQuejaComponent } from './reportes-queja.component';

describe('ReportesQuejaComponent', () => {
  let component: ReportesQuejaComponent;
  let fixture: ComponentFixture<ReportesQuejaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportesQuejaComponent]
    });
    fixture = TestBed.createComponent(ReportesQuejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
