import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../../store";
import {MatDialog} from "@angular/material/dialog";
import {Observable, Subscription} from "rxjs";
import {canCreateEmployees, canDestroyEmployees, canEditEmployees} from "../../store/auth/auth.selectors";
import {MatSort, Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../core/models/user";
import {selectAllEmployees, selectEmployeesLoading} from "../../store/employees/employees.selectors";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  employees$: Observable<User[]> = this.store.pipe(select(selectAllEmployees));
  readonly loading$: Observable<boolean> = this.store.pipe(select(selectEmployeesLoading));
  readonly canCreate$ = this.store.pipe(select(canCreateEmployees));
  readonly canDestroy$ = this.store.pipe(select(canDestroyEmployees));
  readonly canEdit$ = this.store.pipe(select(canEditEmployees));

  readonly displayedColumns: string[] = ['id', 'name', 'email', 'role', 'action'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  private data: User[] = [];
  dataSource = new MatTableDataSource(this.data);
  private subscription: Subscription;

  constructor(private store: Store<AppState>,
              private changeDetectorRefs: ChangeDetectorRef,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openFormDialog(data?: User) {

  }

  sortData($event: Sort) {

  }

  destroy(element) {

  }

  applyFilter(value: any) {

  }
}
