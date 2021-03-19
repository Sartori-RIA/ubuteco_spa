import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-cancel-button',
  templateUrl: './cancel-button.component.html',
  styleUrls: ['./cancel-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CancelButtonComponent {
  @Output() cancel = new EventEmitter();
  @Input() tooltip = '';

}

