import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-next-button',
  templateUrl: './next-button.component.html',
  styleUrls: ['./next-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NextButtonComponent {

  @Output() next = new EventEmitter();
  @Input() tooltip: string;

}
