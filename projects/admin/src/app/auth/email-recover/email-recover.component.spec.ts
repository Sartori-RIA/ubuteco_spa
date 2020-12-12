import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmailRecoverComponent } from './email-recover.component';

describe('EmailRecoverComponent', () => {
  let component: EmailRecoverComponent;
  let fixture: ComponentFixture<EmailRecoverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailRecoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailRecoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
