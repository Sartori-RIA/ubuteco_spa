import {ErrorHandler, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {BugsnagErrorHandler} from '@bugsnag/plugin-angular';

@Injectable()
export class ErrorInterceptorService implements ErrorHandler {

  handleError(error: any): void {
    if (environment.production) {
      // tslint:disable-next-line:no-unused-expression
      new BugsnagErrorHandler();
    }
  }
}
