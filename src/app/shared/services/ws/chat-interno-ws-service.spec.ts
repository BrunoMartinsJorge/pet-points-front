import { TestBed } from '@angular/core/testing';

import { ChatInternoWsService } from './chat-interno-ws-service';

describe('ChatInternoWsService', () => {
  let service: ChatInternoWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatInternoWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
