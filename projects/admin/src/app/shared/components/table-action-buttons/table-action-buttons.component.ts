import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-table-action-buttons',
  templateUrl: './table-action-buttons.component.html',
  styleUrls: ['./table-action-buttons.component.scss']
})
export class TableActionButtonsComponent {

  @Input() canEdit: boolean | null = true;
  @Input() canDestroy: boolean | null = true;
  @Input() canShow: boolean | null = true;

  @Output() destroyElement = new EventEmitter();
  @Output() updateElement = new EventEmitter();
  @Output() showElement = new EventEmitter();

}
