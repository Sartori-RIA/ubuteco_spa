import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogActionButtonsComponent } from './dialog-action-buttons.component';

describe('DialogActionButtonsComponent', () => {
  let component: DialogActionButtonsComponent;
  let fixture: ComponentFixture<DialogActionButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogActionButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogActionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
