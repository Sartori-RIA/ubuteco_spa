import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-show-button',
  templateUrl: './show-button.component.html',
  styleUrls: ['./show-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowButtonComponent {

  @Output() showElement = new EventEmitter();
  @Input() tooltip: string;

}
