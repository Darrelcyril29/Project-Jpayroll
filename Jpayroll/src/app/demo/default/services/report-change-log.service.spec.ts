import { TestBed } from '@angular/core/testing';

import { ReportChangeLogService } from './report-change-log.service';

describe('ReportChangeLogService', () => {
  let service: ReportChangeLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportChangeLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
