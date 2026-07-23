import { TestBed } from '@angular/core/testing';

import { ChatAtendimentoWsService } from './chat-atendimento-ws-service';

describe('ChatAtendimentoWsService', () => {
  let service: ChatAtendimentoWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatAtendimentoWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
