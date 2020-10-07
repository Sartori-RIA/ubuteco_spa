import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BeerStyle} from '../../core/models/beer-style';
import {AppState} from '../../store';
import {Store} from '@ngrx/store';
import {ADD_BEER_STYLE, UPDATE_BEER_STYLE} from '../../store/beer-styles/beer-styles.actions';

@Component({
  selector: 'app-beer-styles-form-dialog',
  templateUrl: './beer-styles-form-dialog.component.html',
  styleUrls: ['./beer-styles-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeerStylesFormDialogComponent implements OnInit {

  beerStyleControl = this.fb.control(null, [Validators.required]);

  constructor(private dialogRef: MatDialogRef<BeerStylesFormDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: BeerStyle,
              private store: Store<AppState>,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.updateForm();
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onAddBeerStyle() {
    if (this.beerStyleControl.valid) {
      const style: BeerStyle = {
        ...this.data,
        name: this.beerStyleControl.value,
      };
      if (style.id) {
        this.store.dispatch(UPDATE_BEER_STYLE({style}));
      } else {
        this.store.dispatch(ADD_BEER_STYLE({style}));
      }
    } else {
      this.beerStyleControl.markAllAsTouched();
    }
  }

  private updateForm() {
    this.beerStyleControl.patchValue(this.data?.name);
  }

}
