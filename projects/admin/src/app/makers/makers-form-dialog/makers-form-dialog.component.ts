import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Maker} from '../../core/models/maker';
import {ADD_MAKER, UPDATE_MAKER} from "../../store/makers/makers.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../store";

@Component({
  selector: 'app-makers-form-dialog',
  templateUrl: './makers-form-dialog.component.html',
  styleUrls: ['./makers-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MakersFormDialogComponent implements OnInit {

  form: FormGroup = this.mountForm();

  constructor(public dialogRef: MatDialogRef<MakersFormDialogComponent>,
              private fb: FormBuilder,
              private store: Store<AppState>,
              @Inject(MAT_DIALOG_DATA) public data: MakerDialogData) {
  }

  ngOnInit() {
    this.updateForm();
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onAddMaker() {
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
      ...this.data.maker,
      name: value.name,
      country: value.country,
    };
  }

  private updateForm() {
    this.form.patchValue({
      name: this.data?.maker?.name,
      country: this.data?.maker?.country,
    });
  }
}

export interface MakerDialogData {
  title: string;
  isBrewery?: boolean;
  maker?: Maker;
}
