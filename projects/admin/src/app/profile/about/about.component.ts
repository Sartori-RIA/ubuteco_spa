import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {selectAuthLoading, selectCurrentUser,} from '../../store/auth/auth.selectors';
import {AppState} from '../../store';
import {User} from '../../core/models/user';
import {UPDATE_USER} from '../../store/auth/auth.actions';
import {take} from "rxjs/operators";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit, OnDestroy {

  form: FormGroup = this.mountForm();
  user$: Observable<User | undefined> = this.store.pipe(select(selectCurrentUser));
  loading$: Observable<boolean> = this.store.pipe(select(selectAuthLoading));
  subscription?: Subscription;

  constructor(private fb: FormBuilder,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.updateForm();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onSubmit() {
    if (this.form.valid) {
      this.user$.pipe(take(1)).subscribe((user) => {
        const data: User = {
          ...user,
          ...this.form.value,
        };
        this.store.dispatch(UPDATE_USER({user: data}));
      });
    }
    this.form.markAllAsTouched();
  }

  private mountForm(): FormGroup {
    return this.fb.group({
      name: [null, Validators.required],
    });
  }

  private updateForm() {
    this.subscription = this.user$.subscribe((user) => {
      this.form.patchValue({
        name: user?.name,
      });
    });
  }
}
