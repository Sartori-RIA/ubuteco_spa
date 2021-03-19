import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-dialog-action-buttons',
  templateUrl: './dialog-action-buttons.component.html',
  styleUrls: ['./dialog-action-buttons.component.scss']
})
export class DialogActionButtonsComponent {

  @Output() cancel = new EventEmitter();
  @Output() confirm = new EventEmitter();
  @Input() show = true;
  @Input() loading: boolean | null = false;
}
