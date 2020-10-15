import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store';
import {Observable, Subscription} from 'rxjs';
import {BeerStyle} from '../../core/models/beer-style';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {WineStylesFormDialogComponent} from '../wine-styles-form-dialog/wine-styles-form-dialog.component';
import {take} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {WineStyle} from '../../core/models/wine-style';
import {
  selectAllWineStyles,
  selectWineStylesOrderedById,
  selectWineStylesOrderedByName
} from '../../store/wine-styles/wine-styles.selectors';
import {
  ADD_WINE_STYLE,
  DELETE_WINE_STYLE,
  REQUEST_ALL_WINE_STYLES,
  UPDATE_WINE_STYLE
} from '../../store/wine-styles/wine-styles.actions';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnInit, OnDestroy {

  wineStyles$: Observable<WineStyle[]> = this.store.pipe(select(selectAllWineStyles));
  displayedColumns: string[] = ['id', 'name', 'action'];
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

  deleteTable(beerStyle: BeerStyle) {
    this.store.dispatch(DELETE_WINE_STYLE({id: beerStyle.id}));
  }

  applyFilter(word: string) {
    this.dataSource.filter = word.trim().toLowerCase();
  }

  openFormDialog(element?: WineStyle) {
    const dialogRef = this.dialog.open(WineStylesFormDialogComponent, {
      data: element ? element : {},
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe((style: WineStyle) => {
      if (style.id) {
        this.store.dispatch(UPDATE_WINE_STYLE({style}));
      } else {
        this.store.dispatch(ADD_WINE_STYLE({style}));
      }
    });
  }

  private updateList() {
    this.subscription = this.wineStyles$.subscribe((tables) => {
      this.dataSource = new MatTableDataSource(tables);
      this.changeDetectorRefs.detectChanges();
    });
  }
}
