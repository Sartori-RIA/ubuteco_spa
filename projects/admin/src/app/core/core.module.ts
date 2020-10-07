import {ErrorHandler, LOCALE_ID, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HeaderInterceptorService} from './interceptors/header-interceptor.service';
import {ErrorInterceptorService} from './interceptors/error-interceptor.service';
import {environment} from '../../environments/environment';
import {ServiceWorkerModule} from '@angular/service-worker';
import {SocketIoModule} from 'ngx-socket-io';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SocketIoModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
  ], providers: [
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptorService, multi: true},
    {provide: ErrorHandler, useClass: ErrorInterceptorService},
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already imported in the AppModule');
    }
  }
}
