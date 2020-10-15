import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashButtonComponent } from './trash-button.component';

describe('TrashButtonComponent', () => {
  let component: TrashButtonComponent;
  let fixture: ComponentFixture<TrashButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrashButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
