import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBody } from './chat-body';

describe('ChatBody', () => {
  let component: ChatBody;
  let fixture: ComponentFixture<ChatBody>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatBody]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatBody);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
