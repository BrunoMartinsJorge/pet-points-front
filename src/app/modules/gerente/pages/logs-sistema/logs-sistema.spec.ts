import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsSistema } from './logs-sistema';

describe('LogsSistema', () => {
  let component: LogsSistema;
  let fixture: ComponentFixture<LogsSistema>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogsSistema]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogsSistema);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
