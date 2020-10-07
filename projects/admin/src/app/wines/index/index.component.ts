import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {AppState} from '../../store';
import {
  selectAllWines,
  selectAllWinesOrderedById,
  selectAllWinesOrderedByName,
  selectAllWinesOrderedByPrice,
  selectAllWinesOrderedByStyle
} from '../../store/wines/wines.selectors';
import {Wine} from '../../core/models/wine';
import {REMOVE_WINE, REQUEST_ALL_WINES} from '../../store/wines/wines.actions';
import {MatDialog} from '@angular/material/dialog';
import {FormComponent} from '../form/form.component';
import {ShowComponent} from '../show/show.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnInit, OnDestroy {

  wines$: Observable<Wine[]> = this.store.pipe(select(selectAllWines));
  displayedColumns: string[] = ['id', 'image', 'name', 'style', 'price', 'action'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  private data: Wine[] = [];
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
    this.store.dispatch(REQUEST_ALL_WINES());
    this.updateBeerList();
  }

  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      return;
    }
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'id':
        this.wines$ = this.store.pipe(select(selectAllWinesOrderedById(isAsc)));
        break;
      case 'name':
        this.wines$ = this.store.pipe(select(selectAllWinesOrderedByName(isAsc)));
        break;
      case 'style':
        this.wines$ = this.store.pipe(select(selectAllWinesOrderedByStyle(isAsc)));
        break;
      case 'price':
        this.wines$ = this.store.pipe(select(selectAllWinesOrderedByPrice(isAsc)));
        break;
      default:
        break;
    }
    return this.updateBeerList();
  }

  openCreateDialog() {
    this.dialog.open(FormComponent, {disableClose: true});
  }

  delete(wine: Wine) {
    this.store.dispatch(REMOVE_WINE({id: wine.id}));
  }

  show(data: Wine) {
    this.dialog.open(ShowComponent, {data});
  }

  applyFilter(word: string) {
    this.dataSource.filter = word.trim().toLowerCase();
  }

  private updateBeerList() {
    this.subscription = this.wines$.subscribe((wines) => {
      this.dataSource = new MatTableDataSource(wines);
      this.changeDetectorRefs.detectChanges();
    });
  }

}
