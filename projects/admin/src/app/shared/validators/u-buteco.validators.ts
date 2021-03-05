import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {cnpj as cnpjValidators, cpf as cpfValidator} from 'cpf-cnpj-validator';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {OrganizationsService} from '../../core/services/api/organizations.service';
import {UserService} from '../../core/services/api/user.service';

export namespace uButecoValidators {
  export function cpf(control: AbstractControl): { [key: string]: boolean } | null {
    if (cpfValidator.isValid(control.value)) {
      return null;
    }
    return {cpf_invalid: true};
  }

  export function cnpj(control: AbstractControl): { [key: string]: boolean } | null {
    if (cnpjValidators.isValid(control.value)) {
      return null;
    }
    return {cnpj_invalid: true};
  }

  export function uniqueEmail(service: UserService, oldEmail?: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      if (control.value == null) {
        return null;
      }
      return service.checkEmail(control.value).pipe(
        map((response) =>
          response.status === 200 && oldEmail !== control.value ? {email_in_use: true} : null)
      );
    };
  }

  export function uniqueCNPJ(service: OrganizationsService, oldCnpj?: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      if (control.value == null) {
        return null;
      }
      return service.checkCNPJ(control.value.replace(/\D+/g, '')).pipe(
        map((response) =>
          response.status === 200 && oldCnpj !== control.value ? {cnpj_in_use: true} : null)
      );
    };
  }

  export function uniquePhone(service: OrganizationsService, oldPhone?: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      if (control.value == null) {
        return null;
      }
      return service.checkPhone(control.value.replace(/\D+/g, '')).pipe(
        map((response) =>
          response.status === 200 && oldPhone !== control.value ? {phone_in_use: true} : null)
      );
    };
  }
}
