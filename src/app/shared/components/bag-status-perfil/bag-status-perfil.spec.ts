import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BagStatusPerfil } from './bag-status-perfil';

describe('BagStatusPerfil', () => {
  let component: BagStatusPerfil;
  let fixture: ComponentFixture<BagStatusPerfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BagStatusPerfil]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BagStatusPerfil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
