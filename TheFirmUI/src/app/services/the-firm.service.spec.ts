import { TestBed } from '@angular/core/testing';

import { TheFirmService } from './the-firm.service';

describe('TheFirmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TheFirmService = TestBed.get(TheFirmService);
    expect(service).toBeTruthy();
  });
});
