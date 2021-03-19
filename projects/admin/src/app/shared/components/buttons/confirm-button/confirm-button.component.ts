import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-confirm-button',
  templateUrl: './confirm-button.component.html',
  styleUrls: ['./confirm-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmButtonComponent {

  @Output() confirmed = new EventEmitter();
  @Input() toolTip = '';
  @Input() loading: boolean | null = false;

}
