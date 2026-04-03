import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPetBag } from './tipo-pet-bag';

describe('TipoPetBag', () => {
  let component: TipoPetBag;
  let fixture: ComponentFixture<TipoPetBag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoPetBag]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoPetBag);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
