import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FinishOrderCardComponent } from './finish-order-card.component';

describe('FinishOrderCardComponent', () => {
  let component: FinishOrderCardComponent;
  let fixture: ComponentFixture<FinishOrderCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishOrderCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishOrderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
