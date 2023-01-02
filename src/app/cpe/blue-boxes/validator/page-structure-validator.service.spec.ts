import { TestBed } from '@angular/core/testing';

import { PageStructureValidatorService } from './page-structure-validator.service';

describe('PageStructureValidatorService', () => {
  let service: PageStructureValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageStructureValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
