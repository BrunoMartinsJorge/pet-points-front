import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatInterno } from './chat-interno';

describe('ChatInterno', () => {
  let component: ChatInterno;
  let fixture: ComponentFixture<ChatInterno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatInterno]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatInterno);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
