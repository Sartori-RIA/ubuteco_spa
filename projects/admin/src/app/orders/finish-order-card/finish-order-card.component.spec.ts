import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {FinishOrderCardComponent} from './finish-order-card.component';
import {SharedModule} from '../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {NgxTranslateModule} from '../../ngx-translate/ngx-translate.module';
import {order} from '../../spec-helpers/factories/order.factory';

describe('FinishOrderCardComponent', () => {
  let component: FinishOrderCardComponent;
  let fixture: ComponentFixture<FinishOrderCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FinishOrderCardComponent],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        TranslateTestingModule,
        NgxTranslateModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishOrderCardComponent);
    component = fixture.componentInstance;
    component.order = order;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
