import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {Dish} from '../../core/models/dish';
import {REQUEST_ALL_FOODS} from '../../store/foods/food.actions';
import {AppState} from '../../store';
import {
  selectAllDishes,
  selectAllDishesOrderedById,
  selectAllDishesOrderedByName,
  selectAllDishesOrderedByPrice
} from '../../store/dishes/dishes.selectors';
import {REMOVE_DISH, REQUEST_ALL_DISHES} from '../../store/dishes/dishes.actions';
import {MatDialog} from '@angular/material/dialog';
import {FormComponent} from '../form/form.component';
import {canCreateDishes, canDestroyDishes, canEditDishes} from '../../store/auth/auth.selectors';
import {BaseDialogParams} from "../../core/models/base.model";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnInit, OnDestroy {


  menu$: Observable<Dish[]> = this.store.pipe(select(selectAllDishes));
  canCreate$ = this.store.pipe(select(canCreateDishes));
  canDestroy$ = this.store.pipe(select(canDestroyDishes));
  canEdit$ = this.store.pipe(select(canEditDishes));
  displayedColumns: string[] = ['id', 'image', 'name', 'price', 'action'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  private data: Dish[] = [];
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
    this.store.dispatch(REQUEST_ALL_DISHES({page: '1'}));
    this.store.dispatch(REQUEST_ALL_FOODS({page: '1'}));
    this.updateRestaurantMenuList();
  }

  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      return;
    }
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'id':
        this.menu$ = this.store.pipe(select(selectAllDishesOrderedById(isAsc)));
        break;
      case 'name':
        this.menu$ = this.store.pipe(select(selectAllDishesOrderedByName(isAsc)));
        break;
      case 'price':
        this.menu$ = this.store.pipe(select(selectAllDishesOrderedByPrice(isAsc)));
        break;
      default:
        break;
    }
    return this.updateRestaurantMenuList();
  }

  deleteDish(item: Dish) {
    this.store.dispatch(REMOVE_DISH({id: item.id}));
  }

  applyFilter(word: string) {
    this.dataSource.filter = word.trim().toLowerCase();
  }

  openForm() {
    const data: BaseDialogParams<Dish> = {
      data: undefined,
      disabled: false,
    };
    this.dialog.open(FormComponent, {disableClose: true, data});
  }

  openEditForm(dish: Dish) {
    const data: BaseDialogParams<Dish> = {
      data: dish,
      disabled: false,
    };
    this.dialog.open(FormComponent, {disableClose: true, data});
  }

  openShowForm(dish: Dish) {
    const data: BaseDialogParams<Dish> = {
      data: dish,
      disabled: true,
    };
    this.dialog.open(FormComponent, {disableClose: false, data});
  }

  private updateRestaurantMenuList() {
    this.subscription = this.menu$.subscribe((items) => {
      this.dataSource = new MatTableDataSource(items);
      this.changeDetectorRefs.detectChanges();
    });
  }
}
