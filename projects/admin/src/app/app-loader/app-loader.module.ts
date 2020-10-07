import {NgModule} from '@angular/core';

import {LoaderComponent} from './loader.component';
import player from 'lottie-web';
import {LottieModule} from 'ngx-lottie';
import {MatDialogModule} from '@angular/material/dialog';

export function playerFactory() {
  return player;
}


@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    MatDialogModule,
    LottieModule.forRoot({player: playerFactory, useCache: true})
  ]
})
export class AppLoaderModule {
}
