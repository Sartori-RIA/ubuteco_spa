import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Maker} from '../../core/models/maker';
import {ADD_MAKER, UPDATE_MAKER} from '../../store/makers/makers.actions';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store';
import {Observable} from 'rxjs';
import {selectMakersLoading} from '../../store/makers/makers.selectors';

@Component({
  selector: 'app-makers-form-dialog',
  templateUrl: './makers-form-dialog.component.html',
  styleUrls: ['./makers-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MakersFormDialogComponent implements OnInit {

  form: FormGroup = this.mountForm();
  readonly loading$: Observable<boolean> = this.store.pipe(select(selectMakersLoading));

  constructor(public dialogRef: MatDialogRef<MakersFormDialogComponent>,
              private fb: FormBuilder,
              private store: Store<AppState>,
              @Inject(MAT_DIALOG_DATA) public data: Maker) {
  }

  ngOnInit() {
    this.updateForm();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.form.valid) {
      const maker = this.mountMaker();
      if (maker.id) {
        this.store.dispatch(UPDATE_MAKER({maker}));
      } else {
        this.store.dispatch(ADD_MAKER({maker}));
      }
      this.dialogRef.close();
    } else {
      this.form.markAllAsTouched();
    }
  }

  private mountForm(): FormGroup {
    return this.fb.group({
      name: [null, Validators.required],
      country: [null, Validators.required],
    });
  }

  private mountMaker(): Maker {
    const value = this.form.value;
    return {
      ...this.data,
      name: value.name,
      country: value.country,
    };
  }

  private updateForm() {
    this.form.patchValue({
      name: this.data?.name,
      country: this.data?.country,
    });
  }
}
