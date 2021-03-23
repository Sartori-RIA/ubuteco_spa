import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store';
import {REMOVE_ORDER, REQUEST_ALL_ORDERS} from '../../store/orders/orders.actions';
import {Order} from '../../core/models/order';
import {Observable, Subscription} from 'rxjs';
import {selectAllOrders} from '../../store/orders/orders.selectors';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnInit, OnDestroy {

  orders$: Observable<Order[]> = this.store.pipe(select(selectAllOrders));
  displayedColumns: string[] = ['id', 'client', 'table', 'total', 'action'];
  private data: Order[] = [];
  dataSource = new MatTableDataSource(this.data);
  private subscription?: Subscription;

  constructor(private store: Store<AppState>,
              private router: Router,
              private changeDetectorRefs: ChangeDetectorRef) {
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit() {
    this.store.dispatch(REQUEST_ALL_ORDERS({page: '1'}));
    this.updateOrderList();
  }

  cancelOrder(order: Order) {
    if (order.id) {
      this.store.dispatch(REMOVE_ORDER({id: order.id}));
    }
  }

  applyFilter(word: string) {
    this.dataSource.filter = word;
  }

  private updateOrderList() {
    this.subscription = this.orders$.subscribe((orders) => {
      this.dataSource = new MatTableDataSource(orders);
      this.changeDetectorRefs.detectChanges();
    });
  }
}
