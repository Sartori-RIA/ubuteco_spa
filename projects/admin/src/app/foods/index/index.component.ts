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
  selectAllFoodsOrderedByQuantity
} from '../../store/foods/food.selectors';
import {Food} from '../../core/models/food';
import {REMOVE_FOOD, REQUEST_ALL_FOODS} from '../../store/foods/food.actions';
import {AppState} from '../../store';
import {MatDialog} from '@angular/material/dialog';
import {FormComponent} from "../form/form.component";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnInit, OnDestroy {

  foods$: Observable<Food[]> = this.store.pipe(select(selectAllFoods));
  displayedColumns: string[] = ['id', 'image', 'name', 'quantity', 'price', 'action'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  private data: Food[] = [];
  dataSource = new MatTableDataSource(this.data);
  private subscription: Subscription;

  constructor(private store: Store<AppState>,
              private dialog: MatDialog,
              private changeDetectorRefs: ChangeDetectorRef) {
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.store.dispatch(REQUEST_ALL_FOODS());
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
    this.store.dispatch(REMOVE_FOOD({id: food.id}));
  }

  applyFilter(word: string) {
    this.dataSource.filter = word.trim().toLowerCase();
  }

  openCreateDialog() {
    this.dialog.open(FormComponent, {disableClose: true});
  }

  private updateFoodList() {
    this.subscription = this.foods$.subscribe((foods) => {
      this.dataSource = new MatTableDataSource(foods);
      this.changeDetectorRefs.detectChanges();
    });
  }

}
