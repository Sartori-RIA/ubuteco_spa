import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {
  selectAllFoods,
  selectAllFoodsOrderedById,
  selectAllFoodsOrderedByName,
  selectAllFoodsOrderedByPrice,
  selectAllFoodsOrderedByQuantity,
  selectFoodLoading
} from '../../store/foods/food.selectors';
import {Food} from '../../core/models/food';
import {REMOVE_FOOD, REQUEST_ALL_FOODS} from '../../store/foods/food.actions';
import {AppState} from '../../store';
import {MatDialog} from '@angular/material/dialog';
import {FormComponent} from '../form/form.component';
import {canCreateFoods, canDestroyFoods, canEditFoods} from '../../store/auth/auth.selectors';
import {BaseDialogParams} from '../../core/models/base.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnInit, OnDestroy {

  foods$: Observable<Food[]> = this.store.pipe(select(selectAllFoods));
  readonly loading$: Observable<boolean> = this.store.pipe(select(selectFoodLoading));
  readonly canCreate$ = this.store.pipe(select(canCreateFoods));
  readonly canDestroy$ = this.store.pipe(select(canDestroyFoods));
  readonly canEdit$ = this.store.pipe(select(canEditFoods));
  readonly displayedColumns: string[] = ['id', 'image', 'name', 'quantity', 'price', 'action'];
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  private data: Food[] = [];
  dataSource = new MatTableDataSource(this.data);
  private subscription?: Subscription;

  constructor(private store: Store<AppState>,
              private dialog: MatDialog,
              private changeDetectorRefs: ChangeDetectorRef) {
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.store.dispatch(REQUEST_ALL_FOODS({page: '1'}));
    this.updateFoodList();
  }

  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      return;
    }
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'id':
        this.foods$ = this.store.pipe(select(selectAllFoodsOrderedById(isAsc)));
        break;
      case 'name':
        this.foods$ = this.store.pipe(select(selectAllFoodsOrderedByName(isAsc)));
        break;
      case 'quantity':
        this.foods$ = this.store.pipe(select(selectAllFoodsOrderedByQuantity(isAsc)));
        break;
      case 'price':
        this.foods$ = this.store.pipe(select(selectAllFoodsOrderedByPrice(isAsc)));
        break;
    }
    return this.updateFoodList();
  }

  deleteFood(food: Food) {
    if (food.id) {
      this.store.dispatch(REMOVE_FOOD({id: food.id}));
    }
  }

  applyFilter(word: string) {
    this.dataSource.filter = word;
  }

  openShowDialog(food: Food) {
    const data: BaseDialogParams<Food> = {data: food, disabled: true};
    this.dialog.open(FormComponent, {disableClose: false, data});
  }

  openCreateDialog() {
    const data: BaseDialogParams<Food> = {data: undefined, disabled: false};
    this.dialog.open(FormComponent, {disableClose: true, data});
  }

  openEditDialog(food: Food) {
    const data: BaseDialogParams<Food> = {data: food, disabled: false};
    this.dialog.open(FormComponent, {disableClose: true, data});
  }

  private updateFoodList() {
    this.subscription = this.foods$.subscribe((foods) => {
      this.dataSource = new MatTableDataSource(foods);
      this.changeDetectorRefs.detectChanges();
    });
  }

}
