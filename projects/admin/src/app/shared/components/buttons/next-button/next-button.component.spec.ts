import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextButtonComponent } from './next-button.component';

describe('NextButtonComponent', () => {
  let component: NextButtonComponent;
  let fixture: ComponentFixture<NextButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
