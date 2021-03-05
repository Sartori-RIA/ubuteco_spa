import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {WineStyle} from '../../core/models/wine-style';
import {ADD_WINE_STYLE, UPDATE_WINE_STYLE} from '../../store/wine-styles/wine-styles.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../store';
import {uButecoValidators} from '../../shared/validators/u-buteco.validators';
import {WineStyleService} from '../../core/services/api/wine-style.service';

@Component({
  selector: 'app-wine-styles-form-dialog',
  templateUrl: './wine-styles-form-dialog.component.html',
  styleUrls: ['./wine-styles-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WineStylesFormDialogComponent implements OnInit {

  wineStyleControl = this.fb.control(null, [Validators.required]);

  constructor(public dialogRef: MatDialogRef<WineStylesFormDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: WineStyle,
              private store: Store<AppState>,
              private wineStyle: WineStyleService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.updateForm();
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onAddBeerStyle() {
    if (this.wineStyleControl.valid) {
      const style: WineStyle = {
        ...this.data,
        name: this.wineStyleControl.value,
      };
      if (style.id) {
        this.store.dispatch(UPDATE_WINE_STYLE({style}));
      } else {
        this.store.dispatch(ADD_WINE_STYLE({style}));
      }
      this.dialogRef.close();
    } else {
      this.wineStyleControl.markAllAsTouched();
    }
  }

  private updateForm() {
    this.wineStyleControl.patchValue(this.data?.name);
  }

  private mountForm(): FormControl {
    return this.fb.control(
      null,
      [Validators.required],
      [uButecoValidators.uniqueBeerStyle(this.wineStyle, this.data?.name)]
    );
  }
}
