import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {BeerStylesService} from '../../core/services/api/beer-styles.service';
import {map} from 'rxjs/operators';
import {WineStyleService} from '../../core/services/api/wine-style.service';

export namespace uButecoMockValidators {
  export function uniqueEmail(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const nonAvailableEmails = [
        'super_admin@email.com', 'admin@email.com', 'kitchen@email.com', 'customer@email.com',
        'waiter@email.com', 'cash_register@email.com'
      ];
      if (nonAvailableEmails.includes(control.value)) {
        return of({email_in_use: true});
      } else {
        return of(null);
      }
    };
  }

  export function uniqueCNPJ(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const nonAvailableCNPJ = [
        '31.515.296/0001-07'
      ];
      if (nonAvailableCNPJ.includes(control.value)) {
        return of({cnpj_in_use: true});
      } else {
        return of(null);
      }
    };
  }

  export function uniquePhone(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const nonAvailablePhones = [
        ''
      ];
      if (nonAvailablePhones.includes(control.value)) {
        return of({phone_in_use: true});
      } else {
        return of(null);
      }
    };
  }


  export function uniqueBeerStyle(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const nonAvailableBeerStyles = [
        ''
      ];
      if (nonAvailableBeerStyles.includes(control.value)) {
        return of({name_in_use: true});
      } else {
        return of(null);
      }
    };
  }

  export function uniqueWineStyle(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const nonAvailableWineStyles = [
        ''
      ];
      if (nonAvailableWineStyles.includes(control.value)) {
        return of({name_in_use: true});
      } else {
        return of(null);
      }
    };
  }

}
