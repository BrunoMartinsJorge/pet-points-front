import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsClinica } from './pets-clinica';

describe('PetsClinica', () => {
  let component: PetsClinica;
  let fixture: ComponentFixture<PetsClinica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetsClinica]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetsClinica);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
