import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-load-more-button',
  templateUrl: './load-more-button.component.html',
  styleUrls: ['./load-more-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadMoreButtonComponent {

  @Output() loadMore = new EventEmitter();
  @Input() loading: boolean;
  @Input() tooltip: string;
}
