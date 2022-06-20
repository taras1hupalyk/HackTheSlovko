import { TestBed } from '@angular/core/testing';

import { SlovkoService } from './slovko.service';

describe('SlovkoService', () => {
  let service: SlovkoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlovkoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
