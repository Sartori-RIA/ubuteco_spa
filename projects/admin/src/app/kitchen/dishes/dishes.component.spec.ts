import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DishesComponent} from './dishes.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {SharedModule} from '../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {kitchenInitialState} from '../../spec-helpers/states/kitchen.fake-state';
import {NgxTranslateModule} from '../../ngx-translate/ngx-translate.module';
import {DishesStatusesComponent} from '../dishes-statuses/dishes-statuses.component';
import {authInitialState} from '../../spec-helpers/states/auth.fake-state';

describe('DishesComponent', () => {
  let component: DishesComponent;
  let fixture: ComponentFixture<DishesComponent>;
  let store: MockStore;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({
        initialState: {
          kitchen: kitchenInitialState,
          auth: authInitialState
        }
      })],
      declarations: [
        DishesComponent,
        DishesStatusesComponent
      ],
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
    fixture = TestBed.createComponent(DishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
