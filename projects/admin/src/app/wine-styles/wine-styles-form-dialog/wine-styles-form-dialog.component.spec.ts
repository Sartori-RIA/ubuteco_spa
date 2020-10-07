import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WineStylesFormDialogComponent } from './wine-styles-form-dialog.component';

describe('WineStylesFormDialogComponent', () => {
  let component: WineStylesFormDialogComponent;
  let fixture: ComponentFixture<WineStylesFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WineStylesFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WineStylesFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
