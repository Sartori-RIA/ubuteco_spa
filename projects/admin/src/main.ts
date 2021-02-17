import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import Bugsnag from "@bugsnag/js";


if (environment.production) {
  enableProdMode();
  Bugsnag.start({apiKey: environment.bugsnag});
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
