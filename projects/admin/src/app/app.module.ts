import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
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
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material/core';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {NgxMaskModule} from 'ngx-mask';
import {FontAwesomeIconsModule} from './font-awesome-icons/font-awesome-icons.module';
import {NgxTranslateModule} from './ngx-translate/ngx-translate.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

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
    FontAwesomeIconsModule,
    NgxTranslateModule,
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {float: 'always'}},
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    {provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
