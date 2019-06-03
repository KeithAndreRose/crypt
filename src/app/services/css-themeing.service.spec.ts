import { TestBed } from '@angular/core/testing';

import { CssThemeingService } from './css-themeing.service';

describe('CssThemeingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CssThemeingService = TestBed.get(CssThemeingService);
    expect(service).toBeTruthy();
  });
});
