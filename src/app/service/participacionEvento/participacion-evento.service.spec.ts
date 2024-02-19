import { TestBed } from '@angular/core/testing';

import { ParticipacionEventoService } from './participacion-evento.service';

describe('ParticipacionEventoService', () => {
  let service: ParticipacionEventoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticipacionEventoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
