import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {uButecoValidators} from '../../shared/validators/u-buteco.validators';
import {UserService} from '../../core/services/api/user.service';
import {OrganizationsService} from '../../core/services/api/organizations.service';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store';
import {SIGN_UP} from '../../store/auth/auth.actions';
import {PasswordValidators} from 'ngx-validators';
import {Observable} from 'rxjs';
import {selectAuthLoading} from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {

  form: FormGroup = this.mountForm();
  readonly loading$: Observable<boolean> = this.store.pipe(select(selectAuthLoading));

  constructor(private fb: FormBuilder,
              private store: Store<AppState>,
              private userService: UserService,
              private organizationService: OrganizationsService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const value = this.form.value;
      this.store.dispatch(SIGN_UP({
        payload: {
          user: {
            email: value.email,
            name: value.name,
            password: value.password
          },
          organization_attributes: {
            cnpj: value.cnpj,
            name: value.organization_name,
            phone: value.organization_phone
          }
        }
      }));
    }
  }

  private mountForm(): FormGroup {
    return this.fb.group(
      {
        agreed: [false, Validators.requiredTrue],
        email: [null, [Validators.required, Validators.email], [uButecoValidators.uniqueEmail(this.userService)]],
        password: [null, [Validators.required, Validators.minLength(8)]],
        confirm_password: [null, [Validators.required, Validators.minLength(8)]],
        name: [null, [Validators.required]],
        organization_name: [null, [Validators.required]],
        organization_phone: [null, [Validators.required], [uButecoValidators.uniquePhone(this.organizationService)]],
        cnpj: [null, [Validators.required, uButecoValidators.cnpj], [uButecoValidators.uniqueCNPJ(this.organizationService)]]
      }, {validators: PasswordValidators.mismatchedPasswords('password', 'confirm_password')}
    );
  }
}
