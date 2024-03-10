import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportarQuejaComponent } from './reportar-queja.component';

describe('ReportarQuejaComponent', () => {
  let component: ReportarQuejaComponent;
  let fixture: ComponentFixture<ReportarQuejaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportarQuejaComponent]
    });
    fixture = TestBed.createComponent(ReportarQuejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
