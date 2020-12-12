import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TableFormDialogComponent } from './table-form-dialog.component';

describe('TableFormComponent', () => {
  let component: TableFormDialogComponent;
  let fixture: ComponentFixture<TableFormDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TableFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
