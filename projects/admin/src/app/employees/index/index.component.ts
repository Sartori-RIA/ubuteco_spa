import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store';
import {MatDialog} from '@angular/material/dialog';
import {Observable, Subscription} from 'rxjs';
import {
  canCreateEmployees,
  canDestroyEmployees,
  canEditEmployees,
  selectCurrentUser
} from '../../store/auth/auth.selectors';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../../core/models/user';
import {
  selectAllEmployees,
  selectEmployeesLoading,
  selectEmployeesOrderedByEmail,
  selectEmployeesOrderedById,
  selectEmployeesOrderedByName,
  selectEmployeesOrderedRole
} from '../../store/employees/employees.selectors';
import {DELETE_EMPLOYEE, REQUEST_ALL_EMPLOYEES, REQUEST_ROLES} from '../../store/employees/employees.actions';
import {BaseDialogParams} from '../../core/models/base.model';
import {FormComponent} from "../form/form.component";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  employees$: Observable<User[]> = this.store.pipe(select(selectAllEmployees));
  readonly loading$: Observable<boolean> = this.store.pipe(select(selectEmployeesLoading));
  readonly canCreate$ = this.store.pipe(select(canCreateEmployees));
  readonly canDestroy$ = this.store.pipe(select(canDestroyEmployees));
  readonly canEdit$ = this.store.pipe(select(canEditEmployees));
  readonly displayedColumns: string[] = ['id', 'name', 'email', 'role', 'action'];
  readonly users$: Observable<User> = this.store.pipe(select(selectCurrentUser));
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  private data: User[] = [];
  dataSource = new MatTableDataSource(this.data);
  private subscriptions: Subscription[] = [];

  constructor(private store: Store<AppState>,
              private changeDetectorRefs: ChangeDetectorRef,
              private dialog: MatDialog) {
  }

  ngOnDestroy(): void {
    this.subscriptions?.forEach((v) => v.unsubscribe());
  }

  ngOnInit(): void {
    this.store.dispatch(REQUEST_ROLES());
    this.dataSource.sort = this.sort;
    this.subscriptions.push(this.users$.subscribe((user) => {
      this.store.dispatch(REQUEST_ALL_EMPLOYEES({page: '1', organization_id: user.organization_id}));
    }));
    this.updateList();
  }

  openFormDialog(user?: User) {
    const data: BaseDialogParams<User> = {data: user, disabled: false};
    this.dialog.open(FormComponent, {disableClose: true, data});
  }

  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      return;
    }
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'id':
        this.employees$ = this.store.pipe(select(selectEmployeesOrderedById(isAsc)));
        break;
      case 'name':
        this.employees$ = this.store.pipe(select(selectEmployeesOrderedByName(isAsc)));
        break;
      case 'email':
        this.employees$ = this.store.pipe(select(selectEmployeesOrderedByEmail(isAsc)));
        break;
      case 'role':
        this.employees$ = this.store.pipe(select(selectEmployeesOrderedRole(isAsc)));
        break;
      default:
        break;
    }
    return this.updateList();
  }

  destroy(element: User) {
    this.store.dispatch(DELETE_EMPLOYEE({id: element.id}));
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  private updateList() {
    this.subscriptions.push(this.employees$.subscribe((users) => {
      this.dataSource = new MatTableDataSource(users);
      this.changeDetectorRefs.detectChanges();
    }));
  }
}
