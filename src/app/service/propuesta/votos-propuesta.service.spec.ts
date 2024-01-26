import { TestBed } from '@angular/core/testing';

import { VotosPropuestaService } from './votos-propuesta.service';

describe('VotosPropuestaService', () => {
  let service: VotosPropuestaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VotosPropuestaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
