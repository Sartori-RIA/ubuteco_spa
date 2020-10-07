import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store';
import {MatTableDataSource} from '@angular/material/table';
import {REQUEST_ORDERS_DISHES} from '../../store/kitchen/kitchen.actions';
import {selectAllDishesToMake} from '../../store/kitchen/kitchen.selectors';
import {KitchenDish} from '../../core/models/kitchen-dish';
import {FormBuilder} from '@angular/forms';
import {KitchenSocketService} from '../../core/sockets/kitchen-socket.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent implements OnInit, OnDestroy {
  readonly dishes$: Observable<KitchenDish[]> = this.store.pipe(select(selectAllDishesToMake));
  readonly displayedColumns: string[] = ['order_id', 'table', 'client', 'dish', 'quantity', 'action'];
  private data: KitchenDish[] = [];
  dataSource = new MatTableDataSource(this.data);
  private subscription: Subscription;

  constructor(private store: Store<AppState>,
              private fb: FormBuilder,
              private kitchenSocketService: KitchenSocketService,
              private changeDetectorRefs: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.store.dispatch(REQUEST_ORDERS_DISHES());
    this.updateDishesList();
    this.kitchenSocketService.joinInRoom('admin@cookiecode.com.br');
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  applyFilter(word: string) {
    this.dataSource.filter = word.trim().toLowerCase();
  }

  private updateDishesList() {
    this.subscription = this.dishes$.subscribe((dishes) => {
      this.dataSource = new MatTableDataSource(dishes);
      this.changeDetectorRefs.detectChanges();
    });
  }
}
