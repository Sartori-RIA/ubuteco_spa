import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-pricings',
  templateUrl: './pricings.component.html',
  styleUrls: ['./pricings.component.scss']
})
export class PricingsComponent {
  @Input('backgroundGray') backgroundGray: boolean;
  isAnnualSelected: boolean;
}
