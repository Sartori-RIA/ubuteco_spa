import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store';
import {SIGN_OUT} from '../../store/auth/auth.actions';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignOutComponent implements OnInit {

  constructor(private store: Store<AppState>,
              private dialogRef: MatDialogRef<SignOutComponent>) {
  }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onLogout() {
    this.store.dispatch(SIGN_OUT());
    this.dialogRef.close();
  }
}
