import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OrderItemsComponent} from './order-items.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {SharedModule} from '../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {FontAwesomeIconsModule} from '../../font-awesome-icons/font-awesome-icons.module';
import {ordersInitialState} from '../../spec-helpers/states/orders.fake-state';
import {drinksInitialState} from '../../spec-helpers/states/drinks.fake-state';
import {beersInitialState} from '../../spec-helpers/states/beers.fake-state';
import {tablesInitialState} from '../../spec-helpers/states/tables.fake-state';
import {dishesInitialState} from '../../spec-helpers/states/dishes.fake-state';
import {winesInitialState} from '../../spec-helpers/states/wines.fake-state';
import {NgxTranslateModule} from '../../ngx-translate/ngx-translate.module';
import {authInitialState} from '../../spec-helpers/states/auth.fake-state';

describe('OrderItemsComponent', () => {
  let component: OrderItemsComponent;
  let fixture: ComponentFixture<OrderItemsComponent>;
  let store: MockStore;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({
        initialState: {
          auth: authInitialState,
          orders: ordersInitialState,
          drinks: drinksInitialState,
          beers: beersInitialState,
          table: tablesInitialState,
          dishes: dishesInitialState,
          wines: winesInitialState,
          'order-items': ordersInitialState
        }
      })],
      declarations: [OrderItemsComponent],
      imports: [
        SharedModule,
        FontAwesomeIconsModule,
        BrowserAnimationsModule,
        TranslateTestingModule,
        NgxTranslateModule,
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
