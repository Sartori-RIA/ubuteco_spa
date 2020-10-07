import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakersFormDialogComponent } from './makers-form-dialog.component';

describe('MakersFormDialogComponent', () => {
  let component: MakersFormDialogComponent;
  let fixture: ComponentFixture<MakersFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakersFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakersFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
