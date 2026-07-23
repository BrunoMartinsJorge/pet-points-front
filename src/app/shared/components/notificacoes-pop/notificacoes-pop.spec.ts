import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacoesPop } from './notificacoes-pop';

describe('NotificacoesPop', () => {
  let component: NotificacoesPop;
  let fixture: ComponentFixture<NotificacoesPop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificacoesPop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificacoesPop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
