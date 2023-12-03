import { TestBed } from '@angular/core/testing';

import { TareasLocalService } from './tareas-local.service';

describe('TareasLocalService', () => {
  let service: TareasLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareasLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
