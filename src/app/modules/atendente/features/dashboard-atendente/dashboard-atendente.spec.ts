import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAtendente } from './dashboard-atendente';

describe('DashboardAtendente', () => {
  let component: DashboardAtendente;
  let fixture: ComponentFixture<DashboardAtendente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAtendente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAtendente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
