import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DishesStatusesComponent} from './dishes-statuses.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {SharedModule} from '../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {kitchenInitialState} from '../../spec-helpers/states/kitchen.fake-state';
import {kitchenDish} from '../../spec-helpers/factories/order-items.factory';
import {NgxTranslateModule} from '../../ngx-translate/ngx-translate.module';
import {authInitialState} from '../../spec-helpers/states/auth.fake-state';

describe('DishesStatusesComponent', () => {
  let component: DishesStatusesComponent;
  let fixture: ComponentFixture<DishesStatusesComponent>;
  let store: MockStore;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({
        initialState: {
          kitchen: kitchenInitialState,
          auth: authInitialState
        }
      })],
      declarations: [DishesStatusesComponent],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        TranslateTestingModule,
        NgxTranslateModule
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishesStatusesComponent);
    component = fixture.componentInstance;
    component.dish = kitchenDish;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
