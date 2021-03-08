import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {BeerStyle} from '../../core/models/beer-style';
import {select, Store} from '@ngrx/store';
import {
  selectAllBeerStyles,
  selectBeerStyleByName,
  selectBeerStyleLoading
} from '../../store/beer-styles/beer-styles.selectors';
import {Maker} from '../../core/models/maker';
import {selectAllMakers} from '../../store/makers/makers.selectors';
import {AppState} from '../../store';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CREATE_BEER, UPDATE_BEER} from '../../store/beers/beers.actions';
import {BeerStylesFormDialogComponent} from '../../beer-styles/beer-styles-form-dialog/beer-styles-form-dialog.component';
import {REQUEST_ALL_BEER_STYLES} from '../../store/beer-styles/beer-styles.actions';
import {MakersFormDialogComponent} from '../../makers/makers-form-dialog/makers-form-dialog.component';
import {REQUEST_ALL_MAKERS} from '../../store/makers/makers.actions';
import {Beer} from '../../core/models/beer';
import {canCreateBeerStyles, canCreateMakers} from '../../store/auth/auth.selectors';
import {BaseDialogParams} from '../../core/models/base.model';
import {selectBeerLoading} from '../../store/beers/beers.selectors';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {

  form: FormGroup = this.mountForm();
  readonly beerStyles$: Observable<BeerStyle[]> = this.store.pipe(select(selectAllBeerStyles));
  readonly makers$: Observable<Maker[]> = this.store.pipe(select(selectAllMakers));
  readonly canCreateBeerStyle$ = this.store.pipe(select(canCreateBeerStyles));
  readonly canCreateMaker$ = this.store.pipe(select(canCreateMakers));
  readonly loading$: Observable<boolean> = this.store.pipe(select(selectBeerLoading));

  constructor(private fb: FormBuilder,
              private store: Store<AppState>,
              private dialogRef: MatDialogRef<FormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: BaseDialogParams<Beer>,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.store.dispatch(REQUEST_ALL_MAKERS({page: '1'}));
    this.store.dispatch(REQUEST_ALL_BEER_STYLES({page: '1'}));
    this.updateForm();
  }

  onSubmit() {
    if (this.form.valid) {
      const beer = this.mountData();
      if (beer.id) {
        this.store.dispatch(UPDATE_BEER({beer}));
      } else {
        this.store.dispatch(CREATE_BEER({beer}));
      }
      this.dialogRef.close();
    } else {
      this.form.markAllAsTouched();
    }
  }

  openDialogBeerStyle() {
    this.dialog.open(BeerStylesFormDialogComponent);
  }

  openDialogAddMaker() {
    this.dialog.open(MakersFormDialogComponent);
  }

  onCancel() {
    this.dialogRef.close();
  }

  compareSelectValues(val1: BeerStyle | Maker, val2: BeerStyle | Maker) {
    if (!!val1 === false || !!val2 === false) {
      return false;
    }

    return val1?.id === val2?.id;
  }

  private filterBeerStyle(value: string): Observable<BeerStyle[]> {
    return this.store.pipe(select(selectBeerStyleByName(value.toLocaleLowerCase())));
  }

  private updateForm() {
    if (this.data.data) {
      const beer = this.data?.data;
      this.form.patchValue({
        name: beer.name,
        price: beer.price_cents / 100,
        beer_style: beer.beer_style,
        maker: beer.maker,
        ibu: beer.ibu,
        alcohol: beer.alcohol,
        quantity_stock: beer.quantity_stock,
        description: beer.description
      });
      if (!!this.data.disabled) {
        this.form.disable();
      }
    }
  }

  private mountForm(): FormGroup {
    return this.fb.group({
      name: [null, Validators.required],
      price: [null, Validators.required],
      beer_style: [null, Validators.required],
      maker: [null, Validators.required],
      alcohol: [null, [
        Validators.required,
        Validators.min(0),
        Validators.max(100)]
      ],
      ibu: [null, [
        Validators.required,
        Validators.min(0),
        Validators.max(100)]
      ],
      description: [null],
      quantity_stock: [null, Validators.required],
    });
  }

  private mountData(): Beer {
    const value = this.form.value;
    return {
      name: value.name,
      description: value.description,
      price: value.price,
      ibu: value.ibu,
      beer_style_id: value.beer_style.id,
      maker_id: value.maker.id,
      alcohol: value.alcohol,
      quantity_stock: value.quantity_stock,
      id: this.data?.data?.id,
    };
  }
}
