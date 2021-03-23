import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store';
import {FormBuilder} from '@angular/forms';
import {KitchenDish} from '../../core/models/kitchen-dish';
import {MatTableDataSource} from '@angular/material/table';
import {Observable, Subscription} from 'rxjs';
import {selectAllDishesToMake} from '../../store/kitchen/kitchen.selectors';
import {REQUEST_ORDERS_DISHES} from '../../store/kitchen/kitchen.actions';

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
  private subscriptions: Subscription[] = [];

  constructor(private store: Store<AppState>,
              private fb: FormBuilder,
              private changeDetectorRefs: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.store.dispatch(REQUEST_ORDERS_DISHES({page: '1'}));
    this.updateDishesList();
  }

  ngOnDestroy(): void {
    this.subscriptions?.forEach((v) => v.unsubscribe());
  }

  applyFilter(word: string) {
    this.dataSource.filter = word;
  }

  private updateDishesList() {
    this.subscriptions.push(this.dishes$.subscribe((dishes) => {
      this.dataSource = new MatTableDataSource(dishes);
      this.changeDetectorRefs.detectChanges();
    }));
  }
}
