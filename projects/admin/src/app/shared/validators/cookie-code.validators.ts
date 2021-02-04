import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {cnpj as cnpjValidators, cpf as cpfValidator} from 'cpf-cnpj-validator';
import {CredentialsService} from '../../core/services/api/credentials.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {PharmaciesService} from '../../core/services/api/pharmacies.service';

export namespace CookieCodeValidators {
  export function cpf(control: AbstractControl): { [key: string]: boolean } | null {
    if (cpfValidator.isValid(control.value)) {
      return null;
    }
    return {cpf: true};
  }

  export function cnpj(control: AbstractControl): { [key: string]: boolean } | null {
    if (cnpjValidators.isValid(control.value)) {
      return null;
    }
    return {cnpj: true};
  }

  export function uniqueEmail(service: CredentialsService, oldEmail?: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      if (control.value == null) {
        return null;
      }
      return service.checkEmail(control.value).pipe(
        map((response) =>
          response.status === 200 && oldEmail !== control.value ? {emailInUse: true} : null)
      );
    };
  }

  export function uniqueCNPJ(service: PharmaciesService, oldCnpj?: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      if (control.value == null) {
        return null;
      }
      return service.checkCNPJ(control.value.replace(/\D+/g, '')).pipe(
        map((response) =>
          response.status === 200 && oldCnpj !== control.value ? {cnpjInUse: true} : null)
      );
    };
  }
}
