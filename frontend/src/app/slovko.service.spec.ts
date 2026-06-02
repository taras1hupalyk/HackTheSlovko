import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { SlovkoService } from './slovko.service';

describe('SlovkoService', () => {
  let service: SlovkoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(SlovkoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
