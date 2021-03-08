import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {TableState} from '../../store/tables/table.reducer';
import {
  selectAllTables,
  selectAllTablesOrderedById,
  selectAllTablesOrderedByName
} from '../../store/tables/table.selectors';
import {Table} from '../../core/models/table';
import {REMOVE_TABLE, REQUEST_ALL_TABLES} from '../../store/tables/table.actions';
import {MatDialog} from '@angular/material/dialog';
import {TableFormDialogComponent} from '../table-form-dialog/table-form-dialog.component';
import {canCreateTables, canDestroyTables, canEditTables, canShowTableActions} from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnInit, OnDestroy {

  tables$: Observable<Table[]> = this.store.pipe(select(selectAllTables));
  readonly canCreate$ = this.store.pipe(select(canCreateTables));
  readonly canDestroy$ = this.store.pipe(select(canDestroyTables));
  readonly canEdit$ = this.store.pipe(select(canEditTables));
  readonly canShowActions$ = this.store.pipe(select(canShowTableActions));
  readonly displayedColumnsWithAction: string[] = ['id', 'name', 'chairs', 'action'];
  readonly displayedColumns: string[] = ['id', 'name', 'chairs'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  private data: Table[] = [];
  dataSource = new MatTableDataSource(this.data);
  private subscription: Subscription;

  constructor(private store: Store<TableState>,
              private changeDetectorRefs: ChangeDetectorRef,
              private dialog: MatDialog,) {
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.store.dispatch(REQUEST_ALL_TABLES({page: '1'}));
    this.updateList();
  }

  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      return;
    }
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'id':
        this.tables$ = this.store.pipe(select(selectAllTablesOrderedById(isAsc)));
        break;
      case 'name':
        this.tables$ = this.store.pipe(select(selectAllTablesOrderedByName(isAsc)));
        break;
    }
    return this.updateList();
  }

  destroy(table: Table) {
    this.store.dispatch(REMOVE_TABLE({id: table.id}));
  }

  openFormDialog(element?: Table) {
    this.dialog.open(TableFormDialogComponent, {
      data: !!element ? element : null,
    });
  }

  applyFilter(word: string) {
    this.dataSource.filter = word.trim().toLowerCase();
  }

  private updateList() {
    this.subscription = this.tables$.subscribe((tables) => {
      this.dataSource = new MatTableDataSource(tables);
      this.changeDetectorRefs.detectChanges();
    });
  }
}
