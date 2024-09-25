import { TestBed } from '@angular/core/testing';

import { DoctorSharedService } from './doctor-shared.service';

describe('DoctorSharedService', () => {
  let service: DoctorSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
