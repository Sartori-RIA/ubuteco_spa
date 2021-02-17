import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {CoreModule} from './core/core.module';
import {AppStoreModule} from './store/app-store.module';
import {DashComponent} from './dash/dash.component';
import {MaterialModule} from './material/material.module';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {AdminLayoutComponent} from './layout/admin-layout/admin-layout.component';
import {HeaderTopComponent} from './layout/header/header-top/header-top.component';
import {SidebarTopComponent} from './layout/navigation/sidebar-top/sidebar-top.component';
import {SidenavComponent} from './layout/navigation/sidenav/sidenav.component';
import {NotificationsComponent} from './layout/notifications/notifications.component';
import {SidebarSideComponent} from './layout/navigation/sidebar-side/sidebar-side.component';
import {HeaderSideComponent} from './layout/header/header-side/header-side.component';
import {SidebarComponent} from './layout/navigation/sidebar/sidebar.component';
import {FooterComponent} from './layout/footer/footer.component';
import {AuthModule} from './auth/auth.module';
import {StoreModule} from '@ngrx/store';
import * as fromAuth from './store/auth/auth.reducer';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './store/auth/auth.effects';
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material/core';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import {NgxMaskModule} from 'ngx-mask';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    DashComponent,
    AdminLayoutComponent,
    HeaderTopComponent,
    SidebarTopComponent,
    SidenavComponent,
    NotificationsComponent,
    SidebarSideComponent,
    HeaderSideComponent,
    SidebarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule,
    CoreModule,
    NgxMaskModule.forRoot(),
    AppStoreModule,
    AuthModule,
    StoreModule.forFeature(fromAuth.featureKey, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
    TranslateModule.forRoot({
      defaultLanguage: 'pt',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {float: 'always'}},
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    {provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fab, fas, far);
  }
}
