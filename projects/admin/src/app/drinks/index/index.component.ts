import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {Drink} from '../../core/models/drink';
import {
  selectAllDrinks,
  selectAllDrinksOrderedById,
  selectAllDrinksOrderedByMaker,
  selectAllDrinksOrderedByName,
  selectAllDrinksOrderedByPrice,
  selectDrinksLoading,
  selectDrinksTotal
} from '../../store/drinks/drink.selectors';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {REMOVE_DRINK, REQUEST_ALL_DRINKS} from '../../store/drinks/drink.actions';
import {AppState} from '../../store';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {FormComponent} from '../form/form.component';
import {canCreateDrinks, canDestroyDrinks, canEditDrinks} from '../../store/auth/auth.selectors';
import {BaseDialogParams} from '../../core/models/base.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnInit, OnDestroy, AfterViewInit {

  drinks$: Observable<Drink[]> = this.store.pipe(select(selectAllDrinks));
  readonly loading$: Observable<boolean> = this.store.pipe(select(selectDrinksLoading));
  readonly drinksCounter$: Observable<number> = this.store.pipe(select(selectDrinksTotal));
  readonly canCreate$ = this.store.pipe(select(canCreateDrinks));
  readonly canDestroy$ = this.store.pipe(select(canDestroyDrinks));
  readonly canEdit$ = this.store.pipe(select(canEditDrinks));
  readonly displayedColumns: string[] = ['id', 'image', 'name', 'maker', 'price', 'action'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  private data: Drink[] = [];
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

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  ngOnInit() {
    this.store.dispatch(REQUEST_ALL_DRINKS({page: '1'}));
    this.updateBeerList();
  }

  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      return;
    }
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'id':
        this.drinks$ = this.store.pipe(select(selectAllDrinksOrderedById(isAsc)));
        break;
      case 'name':
        this.drinks$ = this.store.pipe(select(selectAllDrinksOrderedByName(isAsc)));
        break;
      case 'maker':
        this.drinks$ = this.store.pipe(select(selectAllDrinksOrderedByMaker(isAsc)));
        break;
      case 'price':
        this.drinks$ = this.store.pipe(select(selectAllDrinksOrderedByPrice(isAsc)));
        break;
      default:
        break;
    }
    return this.updateBeerList();
  }

  delete(drink: Drink) {
    this.store.dispatch(REMOVE_DRINK({id: drink.id}));
  }

  openShowDialog(drink: Drink) {
    const data: BaseDialogParams<Drink> = {data: drink, disabled: true};
    this.dialog.open(FormComponent, {disableClose: false, data});
  }

  applyFilter(word: string) {
    this.dataSource.filter = word.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openCreateDialog() {
    const data: BaseDialogParams<Drink> = {data: undefined, disabled: false};
    this.dialog.open(FormComponent, {disableClose: true, data});
  }

  openEditDialog(drink: Drink) {
    const data: BaseDialogParams<Drink> = {data: drink, disabled: false};
    this.dialog.open(FormComponent, {disableClose: true, data});
  }

  private updateBeerList() {
    this.subscription = this.drinks$.subscribe((drinks) => {
      this.dataSource = new MatTableDataSource(drinks);
      this.changeDetectorRefs.detectChanges();
    });
  }
}
