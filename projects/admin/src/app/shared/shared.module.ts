import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';
import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {FormatCentsPipe} from './pipes/format-cents.pipe';
import {AppLoaderModule} from '../app-loader/app-loader.module';
import {MaterialModule} from '../material/material.module';
import {NgApexchartsModule} from 'ng-apexcharts';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
import {ButtonLoadingComponent} from './components/button-loading/button-loading.component';
import {BottomSheetShareComponent} from './components/bottom-sheet-share/bottom-sheet-share.component';
import {AppLoaderComponent} from '../../../../public/src/app/shared/components/app-loader/app-loader.component';
import {CookieCodeToolsModule} from '../../../../tools/src/lib/cookie-code-tools.module';
import {SidebarTogglerDirective} from './directives/sidebar-toggler.directive';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {RouterModule} from '@angular/router';
import {CustomFormsModule} from 'ng2-validation';
import {CustomFormsModule as NgxCustomFormsModule} from 'ngx-custom-validators';
import {ContainerComponent} from './components/container/container.component';

const NG_MODULES = [
  CommonModule,
  HttpClientModule,
  HttpClientXsrfModule,
  ReactiveFormsModule,
  FormsModule,
  RouterModule,
];

const LIBS_MODULES = [
  NgxMaskModule,
  FontAwesomeModule,
  FlexModule,
  FlexLayoutModule,
  NgApexchartsModule,
  CustomFormsModule,
  NgxCustomFormsModule,
  PerfectScrollbarModule
];

const IBUTECO_LIBS = [
  CookieCodeToolsModule
];

const COMPONENTS = [
  BreadcrumbComponent,
  AppLoaderComponent,
  ButtonLoadingComponent,
  BottomSheetShareComponent,
  ContainerComponent
];

const PIPES = [
  FormatCentsPipe
];
const DIRECTIVES = [
  SidebarTogglerDirective
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES,
    ...DIRECTIVES,
  ],
  imports: [
    ...NG_MODULES,
    ...LIBS_MODULES,
    ...IBUTECO_LIBS,
    AppLoaderModule,
    MaterialModule
  ],
  exports: [
    ...NG_MODULES,
    ...LIBS_MODULES,
    ...COMPONENTS,
    ...PIPES,
    ...DIRECTIVES,
    ...IBUTECO_LIBS,
    AppLoaderModule,
    MaterialModule
  ]
})
export class SharedModule {
}
