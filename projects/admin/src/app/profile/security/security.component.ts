import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store';
import {CookieCodeValidators} from '../../shared/validators/cookie-code.validators';
import {Observable, Subscription} from 'rxjs';
import {selectAuthLoading, selectCurrentUser} from '../../store/auth/auth.selectors';
import {PasswordValidators} from 'ngx-validators';
import {distinctUntilChanged, take} from 'rxjs/operators';
import {UserService} from '../../core/services/api/user.service';
import {UPDATE_USER} from '../../store/auth/auth.actions';
import {User} from '../../core/models/user';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecurityComponent implements OnInit, OnDestroy {

  form: FormGroup;
  subscriptions: Subscription[] = [];
  user$: Observable<User> = this.store.pipe(select(selectCurrentUser));
  loading$: Observable<boolean> = this.store.pipe(select(selectAuthLoading));

  constructor(private  fb: FormBuilder,
              private store: Store<AppState>,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.mountForm();
    this.updateForm();
    this.subscriptions.push(this.form.controls.password.valueChanges.pipe(distinctUntilChanged()).subscribe((values) => {
      if (!!(values?.password) || !(values?.confirm_password)) {
        this.updateValidators();
      } else {
        this.updateValidators(true);
      }
    }));
    this.subscriptions.push(this.form.controls.confirm_password.valueChanges.pipe(distinctUntilChanged()).subscribe((values) => {
      if (!!(values?.password) || !(values?.confirm_password)) {
        this.updateValidators();
      } else {
        this.updateValidators(true);
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  onSubmit() {
    if (this.form.valid) {
      this.user$.pipe(take(1)).subscribe((user) => {
        this.store.dispatch(UPDATE_USER({
          user: {
            ...user,
            password: this.form.value.password,
            email: this.form.value.email
          }
        }));
      });
    }
    this.form.markAllAsTouched();
  }

  private mountForm() {
    this.form = this.fb.group({
      email: [null,
        [Validators.required, Validators.email],
        [CookieCodeValidators.uniqueEmail(this.userService)]],
      password: [null],
      confirm_password: []
    });
  }

  private updateForm() {
    this.user$.pipe(take(1)).subscribe((data) => {
      this.form.patchValue({
        email: data.email,
      });
      this.form.controls.email.setAsyncValidators([CookieCodeValidators.uniqueEmail(this.userService, data.email)]);
      this.form.updateValueAndValidity();
    });
  }

  private updateValidators(clear: boolean = false) {
    if (clear) {
      this.form.clearValidators();
      this.form.controls.password.clearValidators();
      this.form.controls.confirm_password.clearValidators();
    } else {
      this.form.controls.password.setValidators([Validators.required,
        Validators.minLength(8),
        Validators.maxLength(128)
      ]);
      this.form.controls.confirm_password.setValidators([]);
      this.form.setValidators([PasswordValidators.mismatchedPasswords('password', 'confirm_password')]);
    }
    this.form.controls.password.updateValueAndValidity();
    this.form.controls.confirm_password.updateValueAndValidity();
  }

}
