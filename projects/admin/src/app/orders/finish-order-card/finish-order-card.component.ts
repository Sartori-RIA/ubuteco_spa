import {Component, Input, OnInit} from '@angular/core';
import {Order} from '../../core/models/order';

@Component({
  selector: 'app-finish-order-card',
  templateUrl: './finish-order-card.component.html',
  styleUrls: ['./finish-order-card.component.scss']
})
export class FinishOrderCardComponent implements OnInit {

  @Input() order: Order;

  constructor() {
  }

  ngOnInit(): void {
  }

}
