import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-confirm-button',
  templateUrl: './confirm-button.component.html',
  styleUrls: ['./confirm-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmButtonComponent {

  @Output() confirmed = new EventEmitter();
  @Input() toolTip: string;
  @Input() loading: boolean;

}
