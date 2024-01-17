import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuejasComponent } from './quejas.component';

describe('QuejasComponent', () => {
  let component: QuejasComponent;
  let fixture: ComponentFixture<QuejasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuejasComponent]
    });
    fixture = TestBed.createComponent(QuejasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
