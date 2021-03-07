import {FeedbackService} from '../../core/services/api/feedback.service';
import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {Maker} from '../../core/models/maker';
import {selectAllMakers} from '../../store/makers/makers.selectors';
import {AppState} from '../../store';
import {REQUEST_ALL_MAKERS} from '../../store/makers/makers.actions';
import {Drink} from '../../core/models/drink';
import {DrinksService} from '../../core/services/api/drinks.service';
import {CREATE_DRINK, UPDATE_DRINK} from '../../store/drinks/drink.actions';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MakersFormDialogComponent} from '../../makers/makers-form-dialog/makers-form-dialog.component';
import {canCreateMakers} from '../../store/auth/auth.selectors';
import {BaseDialogParams} from '../../core/models/base.model';

@Component({
  selector: 'app-drink-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {

  form: FormGroup = this.mountForm();
  readonly makers$: Observable<Maker[]> = this.store.pipe(select(selectAllMakers));
  canCreateMaker$ = this.store.pipe(select(canCreateMakers));

  constructor(private store: Store<AppState>,
              private drinkService: DrinksService,
              private dialogRef: MatDialogRef<FormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: BaseDialogParams<Drink>,
              private dialog: MatDialog,
              private feedbackService: FeedbackService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.store.dispatch(REQUEST_ALL_MAKERS({page: '1'}));
    this.updateForm();
  }

  compareSelectValues(val1: Maker, val2: Maker): boolean {
    return val1?.id === val2?.id;
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.form.valid) {
      const data = this.mountData();
      if (data.id) {
        this.store.dispatch(UPDATE_DRINK({drink: data}));
      } else {
        this.store.dispatch(CREATE_DRINK({drink: data}));
      }
      this.dialogRef.close();
    } else {
      this.form.markAllAsTouched();
    }
  }

  openDialogAddMaker() {
    this.dialog.open(MakersFormDialogComponent, {
      data: {
        title: 'Adicionar Fabricante'
      }
    });
  }

  private mountForm(): FormGroup {
    return this.fb.group({
      name: [null, Validators.required],
      price: [null, Validators.required],
      maker: [null],
      description: [null],
      quantity_stock: [null, Validators.required],
      flavor: [null]
    });
  }

  private updateForm() {
    if (!!this.data.data) {
      const data = this.data.data;
      this.form.patchValue({
        name: data.name,
        price: data.price_cents / 100,
        maker: data.maker,
        quantity_stock: data.quantity_stock,
        description: data.description,
        flavor: data.flavor
      });
      if (this.data.disabled) {
        this.form.disable();
      }
    }
  }

  private mountData(): Drink {
    const value = this.form.value;
    return {
      name: value.name,
      description: value.description,
      price: value.price,
      maker_id: value.maker?.id,
      quantity_stock: value.quantity_stock,
      flavor: value.flavor,
      id: this.data?.data?.id,
    };
  }

}
