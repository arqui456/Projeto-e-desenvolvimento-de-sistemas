import { TestBed } from '@angular/core/testing';

import { GenReportService } from './gen-report.service';

describe('GenReportService', () => {
  let service: GenReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
