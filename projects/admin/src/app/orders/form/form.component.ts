import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Order, OrderItem, OrderItemType} from '../../core/models/order';
import {AppState} from '../../store';
import {select, Store} from '@ngrx/store';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {AddItemDialogComponent, OrderItemDialogData} from '../add-item-dialog/add-item-dialog.component';
import {Table} from '../../core/models/table';
import {Observable, Subscription} from 'rxjs';
import {selectAllTables} from '../../store/tables/table.selectors';
import {selectOrderById, selectPreCreatedOrder} from '../../store/orders/orders.selectors';
import {REQUEST_ORDER, UPDATE_ORDER} from '../../store/orders/orders.actions';
import {take, tap} from 'rxjs/operators';
import {REQUEST_ALL_TABLES} from '../../store/tables/table.actions';
import {REQUEST_ORDER_ITEMS} from '../../store/order-items/order-items.actions';
import {selectAllOrderItems} from '../../store/order-items/order-items.selectors';
import {REQUEST_ALL_DISHES} from '../../store/dishes/dishes.actions';
import {REQUEST_ALL_DRINKS} from '../../store/drinks/drink.actions';
import {REQUEST_ALL_BEERS} from '../../store/beers/beers.actions';
import {MatSelectChange} from '@angular/material/select/select';
import {REQUEST_ALL_WINES} from '../../store/wines/wines.actions';

@Component({
    selector: 'app-orders-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit, OnDestroy {
    order$?: Observable<Order | undefined>;
    orderItems$: Observable<OrderItem[]> = this.store.pipe(select(selectAllOrderItems));
    readonly tables$: Observable<Table[]> = this.store.pipe(select(selectAllTables));
    readonly form: FormGroup = this.mountForm();
    private subscription?: Subscription;
    private readonly actions = [
        REQUEST_ALL_TABLES,
        REQUEST_ALL_DISHES,
        REQUEST_ALL_DRINKS,
        REQUEST_ALL_BEERS,
        REQUEST_ALL_WINES,
    ];

    constructor(private store: Store<AppState>,
                private fb: FormBuilder,
                private dialog: MatDialog,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.actions.forEach((action) => this.store.dispatch(action({page: '1'})));

        this.activatedRoute.params.pipe(take(1)).subscribe((params) => {
            if (params.id) {
                this.store.dispatch(REQUEST_ORDER({id: params.id}));
                this.store.dispatch(REQUEST_ORDER_ITEMS({order_id: params.id}));
                this.order$ = this.store.pipe(select(selectOrderById(params.id)));
                this.updateForm();
            }
        });
        this.activatedRoute.data.pipe(take(1)).subscribe((data) => {
            if (data.order) {
                this.order$ = this.store.pipe(select(selectPreCreatedOrder));
                this.updateForm();
            }
        });

    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    compareSelectedTable(val1: Table, val2: Table) {
        if (!val1 || !val2) {
            return false;
        }

        return val1.id === val2.id;
    }

    onAddBeer(orderId: number) {
        this.onOpenDialog('Beer', orderId);
    }

    onAddDrink(orderId: number) {
        this.onOpenDialog('Drink', orderId);
    }

    onAddFood(orderId: number) {
        this.onOpenDialog('Dish', orderId);
    }

    onAddWine(orderId: number) {
        this.onOpenDialog('Wine', orderId);
    }

    onSelectTable(event: MatSelectChange) {
        this.order$?.pipe(take(1)).subscribe((order) => {
            const table: Table = event.source.value as Table;
            const data: Order = {...order, table, table_id: table.id};
            this.store.dispatch(UPDATE_ORDER({order: data}));
        });
    }

    private updateForm() {
        this.subscription = this.order$?.pipe(
            tap((order) => {
                if (order) {
                    this.form.patchValue({
                        table: order.table,
                    });
                }
            })
        ).subscribe();
    }

    private onOpenDialog(itemType: OrderItemType, orderId: number) {
        const data: OrderItemDialogData = {
            itemType,
            order_id: orderId
        };
        this.dialog.open(AddItemDialogComponent, {
            data
        });
    }

    private mountForm(): FormGroup {
        return this.fb.group({
            table: [null]
        });
    }
}
