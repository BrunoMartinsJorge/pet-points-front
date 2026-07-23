import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneroBag } from './genero-bag';

describe('GeneroBag', () => {
  let component: GeneroBag;
  let fixture: ComponentFixture<GeneroBag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneroBag]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneroBag);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
