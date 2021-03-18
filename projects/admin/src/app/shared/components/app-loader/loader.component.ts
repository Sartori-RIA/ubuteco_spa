import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AnimationOptions} from 'ngx-lottie';
import {AnimationItem} from 'lottie-web';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-loading',
  template: '<main lottie [options]="options" (animationCreated)="animationCreated($event)"></main>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {

  title?: string;
  message?: string;
  options: AnimationOptions = {
    path: '/assets/animations/loading.json'
  };

  constructor(public dialogRef: MatDialogRef<LoaderComponent>) {
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
}
