import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrderItemComponent } from './order-item.component';

describe('OrderItemComponent', () => {
  let component: EditOrderItemComponent;
  let fixture: ComponentFixture<EditOrderItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOrderItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
