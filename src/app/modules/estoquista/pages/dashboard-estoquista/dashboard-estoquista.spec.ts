import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEstoquista } from './dashboard-estoquista';

describe('DashboardEstoquista', () => {
  let component: DashboardEstoquista;
  let fixture: ComponentFixture<DashboardEstoquista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardEstoquista]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardEstoquista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
