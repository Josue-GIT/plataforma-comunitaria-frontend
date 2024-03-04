import { TestBed } from '@angular/core/testing';

import { ReportarQuejaService } from './reportar-queja.service';

describe('ReportarQuejaService', () => {
  let service: ReportarQuejaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportarQuejaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
