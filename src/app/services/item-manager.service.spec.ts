import { TestBed } from '@angular/core/testing';

import { ItemManagerService } from './item-manager.service';

describe('ItemManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemManagerService = TestBed.get(ItemManagerService);
    expect(service).toBeTruthy();
  });
});
