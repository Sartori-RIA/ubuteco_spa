import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button-loading',
  templateUrl: './button-loading.component.html',
  styleUrls: ['./button-loading.component.scss']
})
export class ButtonLoadingComponent implements OnInit {

  @Input() loading: boolean;
  @Input() btnClass: string;
  @Input() raised = true;
  @Input() loadingText = 'Please wait';
  @Input() type: 'button' | 'submit' = 'submit';
  @Input() color: 'primary' | 'accent' | 'warn';

  constructor() {
  }

  ngOnInit() {
  }

}
