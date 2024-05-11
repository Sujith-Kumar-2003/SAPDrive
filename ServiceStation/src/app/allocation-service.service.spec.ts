import { TestBed } from '@angular/core/testing';

import { AllocationServiceService } from './allocation-service.service';

describe('AllocationServiceService', () => {
  let service: AllocationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllocationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
