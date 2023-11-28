import { TestBed } from '@angular/core/testing';

import { TareasFirebaseService } from './tareas-firebase.service';

describe('TareasFirebaseService', () => {
  let service: TareasFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareasFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
