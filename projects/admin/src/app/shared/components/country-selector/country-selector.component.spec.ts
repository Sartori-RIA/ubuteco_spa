import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrySelectorComponent } from './country-selector.component';

describe('CountrySelectorComponent', () => {
  let component: CountrySelectorComponent;
  let fixture: ComponentFixture<CountrySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountrySelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
