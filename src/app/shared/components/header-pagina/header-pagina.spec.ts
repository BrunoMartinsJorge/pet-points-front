import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPagina } from './header-pagina';

describe('HeaderPagina', () => {
  let component: HeaderPagina;
  let fixture: ComponentFixture<HeaderPagina>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderPagina]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderPagina);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
