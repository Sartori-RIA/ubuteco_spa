import {ErrorHandler, Injectable} from '@angular/core';

@Injectable()
export class ErrorInterceptorService implements ErrorHandler {

  handleError(error: any): void {
  }

}
