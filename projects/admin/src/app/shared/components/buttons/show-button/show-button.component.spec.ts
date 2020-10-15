import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowButtonComponent } from './show-button.component';

describe('ShowButtonComponent', () => {
  let component: ShowButtonComponent;
  let fixture: ComponentFixture<ShowButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
