import {Component} from '@angular/core';

@Component({
  selector: 'app-auth-home',
  template: `
    <div fxFlex
         fxLayout="row"
         fxLayoutAlign="center center"
    >
      <div
        fxLayoutGap="500px"
        fxFlexAlign="center"
        style="text-align: center;"
      >
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
})
export class AuthHomeComponent {
}
