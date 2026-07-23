import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSelecionado } from './chat-selecionado';

describe('ChatSelecionado', () => {
  let component: ChatSelecionado;
  let fixture: ComponentFixture<ChatSelecionado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatSelecionado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatSelecionado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
