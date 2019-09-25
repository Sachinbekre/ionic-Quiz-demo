import { TestBed } from '@angular/core/testing';

import { QuetionService } from './quetion.service';

describe('QuetionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuetionService = TestBed.get(QuetionService);
    expect(service).toBeTruthy();
  });
});
