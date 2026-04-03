import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BagStatusConsulta } from './bag-status-consulta';

describe('BagStatusConsulta', () => {
  let component: BagStatusConsulta;
  let fixture: ComponentFixture<BagStatusConsulta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BagStatusConsulta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BagStatusConsulta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
