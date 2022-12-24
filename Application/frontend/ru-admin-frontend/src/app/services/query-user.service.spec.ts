import { TestBed } from '@angular/core/testing';

import { QueryUserService } from './query-user.service';

describe('QueryUserService', () => {
  let service: QueryUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
