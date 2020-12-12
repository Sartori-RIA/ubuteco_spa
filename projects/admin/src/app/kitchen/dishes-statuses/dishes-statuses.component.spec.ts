import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DishesStatusesComponent } from './dishes-statuses.component';

describe('DishesStatusesComponent', () => {
  let component: DishesStatusesComponent;
  let fixture: ComponentFixture<DishesStatusesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DishesStatusesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishesStatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
