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
import {Organization} from '../../core/models/organization';
import {selectCurrentOrganization} from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent implements OnInit, OnDestroy {
  readonly dishes$: Observable<KitchenDish[]> = this.store.pipe(select(selectAllDishesToMake));
  readonly organization$: Observable<Organization> = this.store.pipe(select(selectCurrentOrganization));
  readonly displayedColumns: string[] = ['order_id', 'table', 'client', 'dish', 'quantity', 'action'];
  private data: KitchenDish[] = [];
  dataSource = new MatTableDataSource(this.data);
  private subscriptions: Subscription[] = [];

  constructor(private store: Store<AppState>,
              private fb: FormBuilder,
              private kitchenSocketService: KitchenSocketService,
              private changeDetectorRefs: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.store.dispatch(REQUEST_ORDERS_DISHES({page: '1'}));
    this.updateDishesList();
    this.subscriptions.push(this.organization$.subscribe((organization) => {
      console.log('org', organization);
      this.kitchenSocketService.joinInRoom(organization.cnpj);
      this.kitchenSocketService.channel.messages.subscribe((messages) => {
        console.log('mensagens', messages);
      })
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions?.forEach((v) => v.unsubscribe());
  }

  applyFilter(word: string) {
    this.dataSource.filter = word.trim().toLowerCase();
  }

  private updateDishesList() {
    this.subscriptions.push(this.dishes$.subscribe((dishes) => {
      this.dataSource = new MatTableDataSource(dishes);
      this.changeDetectorRefs.detectChanges();
    }));
  }
}
