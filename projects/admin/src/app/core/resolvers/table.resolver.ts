import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Table} from '../models/table';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {filter, first, tap} from 'rxjs/operators';
import {AppState} from '../../store';
import {REQUEST_TABLE} from '../../store/tables/table.actions';
import {selectTableById} from '../../store/tables/table.selectors';

@Injectable({
  providedIn: 'root'
})
export class TableResolver implements Resolve<Table> {

  constructor(private store: Store<AppState>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Table> | Promise<Table> | Table {
    const tableId = route.params.id;

    return this.store.pipe(
      select(selectTableById(tableId)),
      tap((table) => {
        if (!table) {
          this.store.dispatch(REQUEST_TABLE({id: tableId}));
        }
      }),
      filter((drink) => !!drink),
      first()
    );
  }

}
