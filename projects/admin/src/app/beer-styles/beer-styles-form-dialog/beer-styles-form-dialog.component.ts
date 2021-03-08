import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BeerStyle} from '../../core/models/beer-style';
import {AppState} from '../../store';
import {select, Store} from '@ngrx/store';
import {ADD_BEER_STYLE, UPDATE_BEER_STYLE} from '../../store/beer-styles/beer-styles.actions';
import {BeerStylesService} from '../../core/services/api/beer-styles.service';
import {uButecoValidators} from '../../shared/validators/u-buteco.validators';
import {selectBeerStyleLoading} from '../../store/beer-styles/beer-styles.selectors';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-beer-styles-form-dialog',
  templateUrl: './beer-styles-form-dialog.component.html',
  styleUrls: ['./beer-styles-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeerStylesFormDialogComponent implements OnInit {

  beerStyleControl: FormControl = this.mountForm();
  loading$: Observable<boolean> = this.store.pipe(select(selectBeerStyleLoading));
  constructor(private dialogRef: MatDialogRef<BeerStylesFormDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: BeerStyle,
              private store: Store<AppState>,
              private BeerStyleService: BeerStylesService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.updateForm();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
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
      this.dialogRef.close();
    } else {
      this.beerStyleControl.markAllAsTouched();
    }
  }

  private updateForm() {
    this.beerStyleControl.patchValue(this.data?.name);
  }

  private mountForm(): FormControl {
    return this.fb.control(
      null,
      [Validators.required],
      [uButecoValidators.uniqueBeerStyle(this.BeerStyleService, this.data?.name)]
    );
  }
}
