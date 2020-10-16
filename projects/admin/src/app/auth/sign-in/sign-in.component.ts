import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store';
import {SIGN_IN} from '../../store/auth/auth.actions';
import {Observable} from 'rxjs';
import {selectSignInErrors} from '../../store/auth/auth.selectors';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  form: FormGroup = this.mountForm();
  errors$: Observable<string> = this.store.pipe(select(selectSignInErrors));

  constructor(private fb: FormBuilder,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.store.dispatch(SIGN_IN({
          user: {
            email: value.email,
            password: value.password
          },
        }
      ));
    } else {
      this.form.markAllAsTouched();
    }
  }

  private mountForm(): FormGroup {
    return this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.min(8)]]
    });
  }

}
