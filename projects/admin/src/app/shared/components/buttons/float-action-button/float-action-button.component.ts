import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-float-action-button',
  templateUrl: './float-action-button.component.html',
  styleUrls: ['./float-action-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FloatActionButtonComponent {

  @Output() fabClick = new EventEmitter();
  @Input() tooltip = '';
  @Input() loading: boolean | null = false;
}
