import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-button-loading',
  templateUrl: './button-loading.component.html',
  styleUrls: ['./button-loading.component.scss']
})
export class ButtonLoadingComponent {

  @Input() loading: boolean | null = false;
  @Input() btnClass?: string;
  @Input() raised = true;
  @Input() style: any = null;
  @Input() loadingText = 'Please wait';
  @Input() type: 'button' | 'submit' = 'submit';
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Output() btnClick = new EventEmitter();
}
