import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BagStatusAtendimento } from './bag-status-atendimento';

describe('BagStatusAtendimento', () => {
  let component: BagStatusAtendimento;
  let fixture: ComponentFixture<BagStatusAtendimento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BagStatusAtendimento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BagStatusAtendimento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
