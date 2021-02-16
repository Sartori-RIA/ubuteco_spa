import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store';
import {Observable, Subscription} from 'rxjs';
import {Maker} from '../../core/models/maker';
import {selectAllMakers, selectMakersOrderedById, selectMakersOrderedByName} from '../../store/makers/makers.selectors';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DELETE_MAKER, REQUEST_ALL_MAKERS} from '../../store/makers/makers.actions';
import {MakersFormDialogComponent} from '../makers-form-dialog/makers-form-dialog.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnInit, OnDestroy {

  makers$: Observable<Maker[]> = this.store.pipe(select(selectAllMakers));
  displayedColumns: string[] = ['id', 'name', 'country', 'action'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  private data: Maker[] = [];
  dataSource = new MatTableDataSource(this.data);
  private subscription: Subscription;

  constructor(private store: Store<AppState>,
              private changeDetectorRefs: ChangeDetectorRef,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.store.dispatch(REQUEST_ALL_MAKERS({page: '1'}));
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
        this.makers$ = this.store.pipe(select(selectMakersOrderedById(isAsc)));
        break;
      case 'name':
        this.makers$ = this.store.pipe(select(selectMakersOrderedByName(isAsc)));
        break;
    }
    return this.updateList();
  }

  deleteTable(maker: Maker) {
    this.store.dispatch(DELETE_MAKER({id: maker.id}));
  }

  applyFilter(word: string) {
    this.dataSource.filter = word.trim().toLowerCase();
  }

  openFormDialog(element?: Maker) {
    this.dialog.open(MakersFormDialogComponent, {
      data: element
    });
  }

  private updateList() {
    this.subscription = this.makers$.subscribe((makers) => {
      this.dataSource = new MatTableDataSource(makers);
      this.changeDetectorRefs.detectChanges();
    });
  }

}
