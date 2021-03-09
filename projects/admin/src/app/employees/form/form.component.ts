import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {BaseDialogParams} from '../../core/models/base.model';
import {UserService} from '../../core/services/api/user.service';
import {User} from '../../core/models/user';
import {selectAllRoles, selectEmployeesLoading} from '../../store/employees/employees.selectors';
import {Role} from '../../core/models/role';
import {uButecoValidators} from '../../shared/validators/u-buteco.validators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form: FormGroup = this.mountForm();
  readonly loading$: Observable<boolean> = this.store.pipe(select(selectEmployeesLoading));
  readonly roles$: Observable<Role[]> = this.store.pipe(select(selectAllRoles));

  constructor(private store: Store<AppState>,
              private dialog: MatDialog,
              private dialogRef: MatDialogRef<FormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: BaseDialogParams<User>,
              private userService: UserService,
              private fb: FormBuilder) {
  }


  ngOnInit(): void {
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {

  }

  compareSelectValues(val1: Role, val2: Role) {
    if (!!val1 === false || !!val2 === false) {
      return false;
    }

    return val1.id === val2.id;
  }

  private mountForm(): FormGroup {
    return this.fb.group({
      name: [null, Validators.required],
      role: [null, Validators.required],
      email: [null, [Validators.required, Validators.email], [uButecoValidators.uniqueEmail(this.userService)]]
    });
  }
}
