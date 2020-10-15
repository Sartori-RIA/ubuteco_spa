import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {REQUEST_ALL_TABLES} from '../store/tables/table.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../store';

@Component({
  selector: 'app-orders-home',
  template: `
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersHomeComponent implements OnInit {

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(REQUEST_ALL_TABLES({page: '1'}));
  }

}
