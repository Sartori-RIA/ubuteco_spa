import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store';
import {
  selectAllBeerStyles, selectBeerStyleLoading,
  selectBeerStylesOrderedById,
  selectBeerStylesOrderedByName
} from '../../store/beer-styles/beer-styles.selectors';
import {Observable, Subscription} from 'rxjs';
import {BeerStyle} from '../../core/models/beer-style';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {DELETE_BEER_STYLE, REQUEST_ALL_BEER_STYLES} from '../../store/beer-styles/beer-styles.actions';
import {BeerStylesFormDialogComponent} from '../beer-styles-form-dialog/beer-styles-form-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {
  canCreateBeerStyles,
  canDestroyBeerStyles,
  canEditBeerStyles,
  canShowBeerStyleActions
} from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnInit, OnDestroy {

  beerStyles$: Observable<BeerStyle[]> = this.store.pipe(select(selectAllBeerStyles));
  readonly loading$: Observable<boolean> = this.store.pipe(select(selectBeerStyleLoading));
  readonly canCreate$ = this.store.pipe(select(canCreateBeerStyles));
  readonly canDestroy$ = this.store.pipe(select(canDestroyBeerStyles));
  readonly canEdit$ = this.store.pipe(select(canEditBeerStyles));
  readonly canShowActions$ = this.store.pipe(select(canShowBeerStyleActions));
  readonly displayedColumnsWithActions: string[] = ['id', 'name', 'action'];
  readonly displayedColumns: string[] = ['id', 'name'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  private data: BeerStyle[] = [];
  dataSource = new MatTableDataSource(this.data);
  private subscription: Subscription;

  constructor(private store: Store<AppState>,
              private changeDetectorRefs: ChangeDetectorRef,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.updateList();
    this.store.dispatch(REQUEST_ALL_BEER_STYLES({page: '1', force: true}));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }


  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      return;
    }
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'id':
        this.beerStyles$ = this.store.pipe(select(selectBeerStylesOrderedById(isAsc)));
        break;
      case 'name':
        this.beerStyles$ = this.store.pipe(select(selectBeerStylesOrderedByName(isAsc)));
        break;
    }
    return this.updateList();
  }

  destroy(beerStyle: BeerStyle) {
    this.store.dispatch(DELETE_BEER_STYLE({id: beerStyle.id}));
  }

  applyFilter(word: string) {
    this.dataSource.filter = word.trim().toLowerCase();
  }

  openFormDialog(element?: BeerStyle) {
    this.dialog.open(BeerStylesFormDialogComponent, {
      data: element ? element : {},
    });
  }

  private updateList() {
    this.subscription = this.beerStyles$.subscribe((tables) => {
      this.dataSource = new MatTableDataSource(tables);
      this.changeDetectorRefs.detectChanges();
    });
  }
}
