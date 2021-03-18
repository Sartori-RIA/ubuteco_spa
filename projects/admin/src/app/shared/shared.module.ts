import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';
import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {FormatCentsPipe} from './pipes/format-cents.pipe';
import {MaterialModule} from '../material/material.module';
import {ButtonLoadingComponent} from './components/buttons/button-loading/button-loading.component';
import {AppLoaderComponent} from '../../../../public/src/app/shared/components/app-loader/app-loader.component';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {RouterModule} from '@angular/router';
import {CustomFormsModule} from 'ng2-validation';
import {CustomFormsModule as NgxCustomFormsModule} from 'ngx-custom-validators';
import {ContainerComponent} from './components/container/container.component';
import {ConfirmDialogComponent} from './components/dialogs/confirm-dialog/confirm-dialog.component';
import {BackButtonComponent} from './components/buttons/back-button/back-button.component';
import {CancelButtonComponent} from './components/buttons/cancel-button/cancel-button.component';
import {CloseButtonComponent} from './components/buttons/close-button/close-button.component';
import {ConfirmButtonComponent} from './components/buttons/confirm-button/confirm-button.component';
import {EditButtonComponent} from './components/buttons/edit-button/edit-button.component';
import {FloatActionButtonComponent} from './components/buttons/float-action-button/float-action-button.component';
import {LoadMoreButtonComponent} from './components/buttons/load-more-button/load-more-button.component';
import {NextButtonComponent} from './components/buttons/next-button/next-button.component';
import {ShowButtonComponent} from './components/buttons/show-button/show-button.component';
import {TrashButtonComponent} from './components/buttons/trash-button/trash-button.component';
import {AvatarModule} from 'ngx-avatar';
import {TranslateModule} from '@ngx-translate/core';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {CountrySelectorComponent} from './components/country-selector/country-selector.component';
import {DialogActionButtonsComponent} from './components/dialog-action-buttons/dialog-action-buttons.component';
import {TableActionButtonsComponent} from './components/table-action-buttons/table-action-buttons.component';
import {AppLoaderModule} from './components/app-loader/app-loader.module';
import { SearchComponent } from './components/search/search.component';

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
  CustomFormsModule,
  NgxCustomFormsModule,
  PerfectScrollbarModule,
  AvatarModule,
  TranslateModule,
  SweetAlert2Module
];

const COMPONENTS = [
  AppLoaderComponent,
  ContainerComponent,
  ConfirmDialogComponent,
  BackButtonComponent,
  ButtonLoadingComponent,
  CancelButtonComponent,
  CloseButtonComponent,
  ConfirmButtonComponent,
  EditButtonComponent,
  FloatActionButtonComponent,
  LoadMoreButtonComponent,
  NextButtonComponent,
  ShowButtonComponent,
  TrashButtonComponent,
  CountrySelectorComponent,
  DialogActionButtonsComponent,
  TableActionButtonsComponent,
  SearchComponent,
];

const PIPES = [
  FormatCentsPipe
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES
  ],
  imports: [
    ...NG_MODULES,
    ...LIBS_MODULES,
    AppLoaderModule,
    MaterialModule
  ],
  exports: [
    ...NG_MODULES,
    ...LIBS_MODULES,
    ...COMPONENTS,
    ...PIPES,
    AppLoaderModule,
    MaterialModule
  ]
})
export class SharedModule {
}
