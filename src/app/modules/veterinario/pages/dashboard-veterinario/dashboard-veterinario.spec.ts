import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardVeterinario } from './dashboard-veterinario';

describe('DashboardVeterinario', () => {
  let component: DashboardVeterinario;
  let fixture: ComponentFixture<DashboardVeterinario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardVeterinario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardVeterinario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
