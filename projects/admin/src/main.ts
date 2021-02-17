import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import * as Sentry from '@sentry/angular';
import {Integrations} from '@sentry/tracing';


if (environment.production) {
  enableProdMode();
  Sentry.init({
    dsn: environment.sentry_dsn,
    integrations: [
      new Integrations.BrowserTracing({
        tracingOrigins: environment.sentry_urls,
        routingInstrumentation: Sentry.routingInstrumentation,
      }),
    ],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });

}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
