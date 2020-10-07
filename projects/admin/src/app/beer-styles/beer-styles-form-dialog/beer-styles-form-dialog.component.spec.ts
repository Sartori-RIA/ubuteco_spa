import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerStylesFormDialogComponent } from './beer-styles-form-dialog.component';

describe('BeerStylesFormDialogComponent', () => {
  let component: BeerStylesFormDialogComponent;
  let fixture: ComponentFixture<BeerStylesFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeerStylesFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerStylesFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
