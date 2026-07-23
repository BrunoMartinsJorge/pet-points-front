import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BagLog } from './bag-log';

describe('BagLog', () => {
  let component: BagLog;
  let fixture: ComponentFixture<BagLog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BagLog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BagLog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
