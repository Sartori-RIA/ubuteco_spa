import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {cnpj as cnpjValidators, cpf as cpfValidator} from 'cpf-cnpj-validator';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {OrganizationsService} from '../../core/services/api/organizations.service';
import {UserService} from '../../core/services/api/user.service';
import {BeerStylesService} from '../../core/services/api/beer-styles.service';
import {WineStyleService} from '../../core/services/api/wine-style.service';

export namespace uButecoValidators {
  export function cpf(control: AbstractControl): ValidationErrors | null {
    if (cpfValidator.isValid(control.value)) {
      return null;
    }
    return {cpf_invalid: true};
  }

  export function cnpj(control: AbstractControl): ValidationErrors | null {
    if (cnpjValidators.isValid(control.value)) {
      return null;
    }
    return {cnpj_invalid: true};
  }

  export function uniqueEmail(service: UserService, oldEmail?: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (control.value == null) {
        return of(null);
      }
      return service.checkEmail(control.value).pipe(
        map((response) =>
          response.status === 200 && oldEmail !== control.value ? {email_in_use: true} : null)
      );
    };
  }

  export function uniqueCNPJ(service: OrganizationsService, oldCnpj?: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (control.value == null) {
        return of(null);
      }
      return service.checkCNPJ(control.value.replace(/\D+/g, '')).pipe(
        map((response) =>
          response.status === 200 && oldCnpj !== control.value ? {cnpj_in_use: true} : null)
      );
    };
  }

  export function uniquePhone(service: OrganizationsService, oldPhone?: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (control.value == null) {
        return of(null);
      }
      return service.checkPhone(control.value.replace(/\D+/g, '')).pipe(
        map((response) =>
          response.status === 200 && oldPhone !== control.value ? {phone_in_use: true} : null)
      );
    };
  }

  export function uniqueBeerStyle(service: BeerStylesService, oldName?: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (control.value == null) {
        return of(null);
      }
      return service.checkStyleAvailable(control.value).pipe(
        map((response) =>
          response.status === 200 && oldName !== control.value ? {name_in_use: true} : null)
      );
    };
  }

  export function uniqueWineStyle(service: WineStyleService, oldName?: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (control.value == null) {
        return of(null);
      }
      return service.checkStyleAvailable(control.value).pipe(
        map((response) =>
          response.status === 200 && oldName !== control.value ? {name_in_use: true} : null)
      );
    };
  }
}
