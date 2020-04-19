import { TestBed } from '@angular/core/testing';

import { CmnService } from './cmn.service';

describe('CmnService', () => {
  let service: CmnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CmnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
