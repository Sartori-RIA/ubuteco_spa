import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-table-action-buttons',
  templateUrl: './table-action-buttons.component.html',
  styleUrls: ['./table-action-buttons.component.scss']
})
export class TableActionButtonsComponent {

  @Input() canEdit = true;
  @Input() canDestroy = true;
  @Input() canShow = true;

  @Output() destroy = new EventEmitter();
  @Output() update = new EventEmitter();
  @Output() show = new EventEmitter();
}
