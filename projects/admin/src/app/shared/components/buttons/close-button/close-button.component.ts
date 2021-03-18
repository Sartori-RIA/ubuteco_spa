import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-close-button',
  templateUrl: './close-button.component.html',
  styleUrls: ['./close-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CloseButtonComponent {

  @Output() closed = new EventEmitter();
  @Input() tooltip = '';

}
