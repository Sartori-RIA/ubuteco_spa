import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeersHomeComponent {
}
