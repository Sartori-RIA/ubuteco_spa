import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ItemOrderSend, Order, OrderItem, OrderItemType } from '../../models/order';
import { HttpClient } from '@angular/common/http';
import { Logger } from '@ngrx/data';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService extends BaseService<Order> {
  constructor(http: HttpClient, logger: Logger) {
    super(http, environment.api_url + 'orders', logger);
  }

  addItem(data: { orderId: number, data: ItemOrderSend }): Observable<OrderItem> {
    const url = `${this.url}/${data.orderId}/items`;
    return this.http.post<OrderItem>(url, data.data).pipe();
  }

  updateItem(data: { orderId: number, item: OrderItem }): Observable<OrderItem> {
    const url = `${this.url}/${data.orderId}/items`;
    return this.http.put<OrderItem>(`${url}/${data.item.id}`, data.item).pipe();
  }

  deleteItem(data: { orderId: number, orderItemId: number }): Observable<{ message: string, id: number, order_id: number }> {
    const url = `${this.url}/${data.orderId}/items/${data.orderItemId}`;
    return this.http.delete<{ message: string, id: number, order_id: number }>(url).pipe();
  }

  allItems(orderId: number): Observable<OrderItem[]> {
    const url = `${this.url}/${orderId}/items`;
    return this.http.get<OrderItem[]>(url).pipe();
  }
}
