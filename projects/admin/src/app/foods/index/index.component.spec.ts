import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {IndexComponent} from './index.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {SharedModule} from '../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {foodsInitialState} from '../../spec-helpers/states/foods.fake-state';
import {NgxTranslateModule} from '../../ngx-translate/ngx-translate.module';
import {authInitialState} from '../../spec-helpers/states/auth.fake-state';
import {FontAwesomeIconsModule} from '../../font-awesome-icons/font-awesome-icons.module';
import {selectFoodLoading} from '../../store/foods/food.selectors';

describe('Foods/IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let store: MockStore;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({
        selectors: [
          {selector: selectFoodLoading, value: false}
        ],
        initialState: {
          food: foodsInitialState,
          auth: authInitialState
        }
      })],
      declarations: [IndexComponent],
      imports: [
        SharedModule,
        FontAwesomeIconsModule,
        BrowserAnimationsModule,
        TranslateTestingModule,
        NgxTranslateModule
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
