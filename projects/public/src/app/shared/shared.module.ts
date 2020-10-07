import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BottomSheetShareComponent} from './components/bottom-sheet-share/bottom-sheet-share.component';
import {AppLoaderComponent} from './components/app-loader/app-loader.component';
import {SharedMaterialModule} from './shared-material.module';

const NG_MODULES = [
  CommonModule,
  FormsModule,
  RouterModule,
  FlexLayoutModule
];

const COMPONENTS = [
  BottomSheetShareComponent,
  AppLoaderComponent
];

@NgModule({
  imports: [
    ...NG_MODULES,
    SharedMaterialModule,
  ],
  declarations: [
    ...COMPONENTS,
  ],
  exports: [
    ...NG_MODULES,
    ...COMPONENTS,
    SharedMaterialModule,
  ]
})
export class SharedModule {
}
