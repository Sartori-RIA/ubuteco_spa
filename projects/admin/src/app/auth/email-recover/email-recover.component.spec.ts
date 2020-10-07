import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailRecoverComponent } from './email-recover.component';

describe('EmailRecoverComponent', () => {
  let component: EmailRecoverComponent;
  let fixture: ComponentFixture<EmailRecoverComponent>;

  beforeEach(async(() => {
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
