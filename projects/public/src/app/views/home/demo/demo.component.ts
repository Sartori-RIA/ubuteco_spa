import {Component} from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent {

  moreTemplates() {
    window.open('https://ui-lib.com/downloads/egret-html5-free-landing-page/');
  }

}
