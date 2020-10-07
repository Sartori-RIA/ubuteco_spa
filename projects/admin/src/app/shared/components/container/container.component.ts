import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-container',
  template: `
    <div style="height: 100vh">
      <div class="container">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
