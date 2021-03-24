import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdminLayoutComponent} from './admin-layout.component';
import {SharedModule} from '../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {TranslateModule} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {FooterComponent} from '../footer/footer.component';
import {HeaderTopComponent} from '../header/header-top/header-top.component';
import {SidebarSideComponent} from '../navigation/sidebar-side/sidebar-side.component';
import {SidebarTopComponent} from '../navigation/sidebar-top/sidebar-top.component';
import {HeaderSideComponent} from '../header/header-side/header-side.component';
import {NotificationsComponent} from '../notifications/notifications.component';
import {authInitialState} from '../../spec-helpers/states/auth.fake-state';
import {LayoutService} from '../../core/services/theme/layout.service';

describe('AdminLayoutComponent', () => {
  let component: AdminLayoutComponent;
  let fixture: ComponentFixture<AdminLayoutComponent>;
  let store: MockStore;
  let layoutService: LayoutService;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({
        initialState: {
          auth: authInitialState
        }
      })],
      declarations: [
        AdminLayoutComponent,
        FooterComponent,
        HeaderTopComponent,
        HeaderSideComponent,
        SidebarSideComponent,
        SidebarTopComponent,
        NotificationsComponent,
      ],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        TranslateTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
    layoutService = TestBed.inject(LayoutService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
