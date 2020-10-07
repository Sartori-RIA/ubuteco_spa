import {AfterViewInit, Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../core/models/user';
import {Store} from '@ngrx/store';
import {AppState} from '../../store';
import {ActivatedRoute} from '@angular/router';
import {UPDATE_USER} from '../../store/user/user.actions';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements AfterViewInit {

  form: FormGroup = this.mountForm();
  user: User = this.activatedRoute.snapshot.data.user;

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private store: Store<AppState>) {
  }

  ngAfterViewInit(): void {
    this.user = this.activatedRoute.snapshot.data.user;
    this.updateForm();
  }

  updateProfile() {
    if (this.form.valid) {
      const user: User = this.form.value;
      this.store.dispatch(UPDATE_USER({user}));
    } else {
      this.form.markAllAsTouched();
    }
  }

  private mountForm(): FormGroup {
    return this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      company_name: [null, Validators.required],
      cnpj: [null, Validators.required],
    });
  }

  private updateForm() {
    console.log(this.activatedRoute.snapshot.data);
    this.form.patchValue({
      name: this.user?.name,
      email: this.user?.email,
      company_name: this.user?.company_name,
      cnpj: this.user?.cnpj
    });
  }
}
