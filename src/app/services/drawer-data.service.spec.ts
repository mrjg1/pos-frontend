import { TestBed, inject } from '@angular/core/testing';

import { DrawerDataService } from './drawer-data.service';

describe('DrawerDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrawerDataService]
    });
  });

  it('should be created', inject([DrawerDataService], (service: DrawerDataService) => {
    expect(service).toBeTruthy();
  }));
});
