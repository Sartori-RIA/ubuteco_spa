import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Beer} from '../../core/models/beer';
import {select, Store} from '@ngrx/store';
import {
  selectAllBeers,
  selectAllBeersOrderedById,
  selectAllBeersOrderedByName,
  selectAllBeersOrderedByPrice,
  selectAllBeersOrderedByStyle,
  selectBeerLoading
} from '../../store/beers/beers.selectors';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {REMOVE_BEER, REQUEST_ALL_BEERS} from '../../store/beers/beers.actions';
import {AppState} from '../../store';
import {MatDialog} from '@angular/material/dialog';
import {FormComponent} from '../form/form.component';
import {canCreateBeers, canDestroyBeers, canEditBeers, canShowBeerActions} from '../../store/auth/auth.selectors';
import {BaseDialogParams} from '../../core/models/base.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnInit, OnDestroy {

  beers$: Observable<Beer[]> = this.store.pipe(select(selectAllBeers));
  readonly canCreate$ = this.store.pipe(select(canCreateBeers));
  readonly canDestroy$ = this.store.pipe(select(canDestroyBeers));
  readonly canEdit$ = this.store.pipe(select(canEditBeers));
  readonly canShowActions$ = this.store.pipe(select(canShowBeerActions));
  readonly displayedColumns: string[] = ['id', 'image', 'name', 'style', 'price'];
  readonly displayedColumnsWithAction: string[] = ['id', 'image', 'name', 'style', 'price', 'action'];
  readonly loading$: Observable<boolean> = this.store.pipe(select(selectBeerLoading));
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  private data: Beer[] = [];
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
    this.store.dispatch(REQUEST_ALL_BEERS({page: '1'}));
    this.updateBeerList();
  }

  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      return;
    }
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'id':
        this.beers$ = this.store.pipe(select(selectAllBeersOrderedById(isAsc)));
        break;
      case 'name':
        this.beers$ = this.store.pipe(select(selectAllBeersOrderedByName(isAsc)));
        break;
      case 'style':
        this.beers$ = this.store.pipe(select(selectAllBeersOrderedByStyle(isAsc)));
        break;
      case 'price':
        this.beers$ = this.store.pipe(select(selectAllBeersOrderedByPrice(isAsc)));
        break;
      default:
        break;
    }
    return this.updateBeerList();
  }

  deleteBeer(beer: Beer) {
    this.store.dispatch(REMOVE_BEER({id: beer.id}));
  }

  applyFilter(word: string) {
    this.dataSource.filter = word.trim().toLowerCase();
  }

  openCreateDialog() {
    const data: BaseDialogParams<Beer> = {
      data: undefined,
      disabled: false,
    };
    this.dialog.open(FormComponent, {disableClose: true, data});
  }

  openEditDialog(beer: Beer) {
    const data: BaseDialogParams<Beer> = {
      data: beer,
      disabled: false,
    };
    this.dialog.open(FormComponent, {disableClose: true, data});
  }

  showElement(beer: Beer) {
    const data: BaseDialogParams<Beer> = {
      data: beer,
      disabled: true,
    };
    this.dialog.open(FormComponent, {data});
  }

  private updateBeerList() {
    this.subscription = this.beers$.subscribe((beers) => {
      this.dataSource = new MatTableDataSource(beers);
      this.changeDetectorRefs.detectChanges();
    });
  }

}
