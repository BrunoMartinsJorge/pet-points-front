import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAtendimentoCliente } from './chat-atendimento-cliente';

describe('ChatAtendimentoCliente', () => {
  let component: ChatAtendimentoCliente;
  let fixture: ComponentFixture<ChatAtendimentoCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatAtendimentoCliente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatAtendimentoCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
