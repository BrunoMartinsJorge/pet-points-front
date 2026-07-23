import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAtendimento } from './chat-atendimento';

describe('ChatAtendimento', () => {
  let component: ChatAtendimento;
  let fixture: ComponentFixture<ChatAtendimento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatAtendimento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatAtendimento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
