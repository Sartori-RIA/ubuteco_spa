import { NgModule } from '@angular/core';

import { OrdersRoutingModule } from './orders-routing.module';
import { SharedModule } from '../shared/shared.module';
import { OrdersHomeComponent } from './orders-home.component';
import { IndexComponent } from './index/index.component';
import { FormComponent } from './form/form.component';
import { StoreModule } from '@ngrx/store';
import * as fromOrders from '../store/orders/order.reducer';
import * as fromOrderItems from '../store/order-items/order-items.reducer';
import * as fromDrinks from '../store/drinks/drink.reducer';
import * as fromBeers from '../store/beers/beer.reducer';
import * as fromTables from '../store/tables/table.reducer';
import * as fromDishes from '../store/dishes/dishes.reducer';
import * as fromWines from '../store/wines/wines.reducer';
import { EffectsModule } from '@ngrx/effects';
import { OrdersEffects } from '../store/orders/orders.effects';
import { DrinkEffects } from '../store/drinks/drink.effects';
import { BeerEffects } from '../store/beers/beer.effects';
import { DishesEffects } from '../store/dishes/dishes.effects';
import { AddItemDialogComponent } from './add-item-dialog/add-item-dialog.component';
import { OrderItemsComponent } from './order-items/order-items.component';
import { TableEffects } from '../store/tables/table.effects';
import { OrderItemsEffects } from '../store/order-items/order-items.effects';
import { FinishOrderCardComponent } from './finish-order-card/finish-order-card.component';
import { EditOrderItemComponent } from './edit-order-item/edit-order-item.component';
import {WinesEffects} from "../store/wines/wines.effects";


@NgModule({
  declarations: [
    OrdersHomeComponent,
    IndexComponent,
    FormComponent,
    AddItemDialogComponent,
    OrderItemsComponent,
    FinishOrderCardComponent,
    EditOrderItemComponent,
  ],
  imports: [
    SharedModule,
    OrdersRoutingModule,
    StoreModule.forFeature(fromOrders.featureKey, fromOrders.reducer),
    StoreModule.forFeature(fromDrinks.featureKey, fromDrinks.reducer),
    StoreModule.forFeature(fromBeers.featureKey, fromBeers.reducer),
    StoreModule.forFeature(fromTables.featureKey, fromTables.reducer),
    StoreModule.forFeature(fromDishes.featureKey, fromDishes.reducer),
    StoreModule.forFeature(fromOrderItems.featureKey, fromOrderItems.reducer),
    StoreModule.forFeature(fromWines.featureKey, fromWines.reducer),
    EffectsModule.forFeature([
      OrdersEffects,
      OrderItemsEffects,
      DrinkEffects,
      BeerEffects,
      TableEffects,
      DishesEffects,
      WinesEffects
    ])
  ],
})
export class OrdersModule {
}
