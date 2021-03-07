import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store';
import {Observable, Subscription} from 'rxjs';
import {BeerStyle} from '../../core/models/beer-style';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {WineStylesFormDialogComponent} from '../wine-styles-form-dialog/wine-styles-form-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {WineStyle} from '../../core/models/wine-style';
import {
  selectAllWineStyles,
  selectWineStylesOrderedById,
  selectWineStylesOrderedByName
} from '../../store/wine-styles/wine-styles.selectors';
import {DELETE_WINE_STYLE, REQUEST_ALL_WINE_STYLES} from '../../store/wine-styles/wine-styles.actions';
import {
  canCreateWineStyles,
  canDestroyWineStyles,
  canEditWineStyles,
  canShowWineStyleActions
} from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnInit, OnDestroy {

  wineStyles$: Observable<WineStyle[]> = this.store.pipe(select(selectAllWineStyles));
  canCreate$ = this.store.pipe(select(canCreateWineStyles));
  canDestroy$ = this.store.pipe(select(canDestroyWineStyles));
  canEdit$ = this.store.pipe(select(canEditWineStyles));
  canShowActions$ = this.store.pipe(select(canShowWineStyleActions));
  displayedColumnsAdmin: string[] = ['id', 'name', 'action'];
  displayedColumns: string[] = ['id', 'name'];
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
    this.store.dispatch(REQUEST_ALL_WINE_STYLES({page: '1'}));
    this.updateList();
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
        this.wineStyles$ = this.store.pipe(select(selectWineStylesOrderedById(isAsc)));
        break;
      case 'name':
        this.wineStyles$ = this.store.pipe(select(selectWineStylesOrderedByName(isAsc)));
        break;
    }
    return this.updateList();
  }

  destroy(beerStyle: BeerStyle) {
    this.store.dispatch(DELETE_WINE_STYLE({id: beerStyle.id}));
  }

  applyFilter(word: string) {
    this.dataSource.filter = word.trim().toLowerCase();
  }

  openFormDialog(element?: WineStyle) {
    this.dialog.open(WineStylesFormDialogComponent, {
      data: element ? element : {},
    });
  }

  private updateList() {
    this.subscription = this.wineStyles$.subscribe((tables) => {
      this.dataSource = new MatTableDataSource(tables);
      this.changeDetectorRefs.detectChanges();
    });
  }
}
