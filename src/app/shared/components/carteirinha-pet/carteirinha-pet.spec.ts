import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteirinhaPet } from './carteirinha-pet';

describe('CarteirinhaPet', () => {
  let component: CarteirinhaPet;
  let fixture: ComponentFixture<CarteirinhaPet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarteirinhaPet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarteirinhaPet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
