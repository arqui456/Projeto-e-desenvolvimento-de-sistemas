import { TestBed } from '@angular/core/testing';

import { BlockPageService } from './block-page.service';

describe('BlockPageService', () => {
  let service: BlockPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
