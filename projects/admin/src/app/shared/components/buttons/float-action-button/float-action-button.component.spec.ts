import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FloatActionButtonComponent } from './float-action-button.component';

describe('FloatActionButtonComponent', () => {
  let component: FloatActionButtonComponent;
  let fixture: ComponentFixture<FloatActionButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FloatActionButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
