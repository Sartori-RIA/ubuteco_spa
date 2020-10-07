import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from './base.service';
import {environment} from '../../../../environments/environment';
import {Logger} from '@ngrx/data';
import {KitchenDish} from '../../models/kitchen-dish';
import {OrderItemStatus} from '../../models/order';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KitchenService extends BaseService<KitchenDish> {

  constructor(http: HttpClient, logger: Logger) {
    super(http, environment.api_url + 'kitchens', logger);
  }

  updateStatus(id: number, status: OrderItemStatus): Observable<KitchenDish> {
    return this.http.put<KitchenDish>(`${this.url}/${id}`, {status});
  }
}
