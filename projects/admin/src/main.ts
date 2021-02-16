import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import * as Sentry from '@sentry/angular';
import {Integrations} from '@sentry/tracing';

Sentry.init({
  dsn: 'https://779b7145fe884e63bca2a3e3372ec003@o524728.ingest.sentry.io/5637967',
  integrations: [
    new Integrations.BrowserTracing({
      tracingOrigins: ['localhost', environment.api_url, environment.auth_url, environment.cable_url],
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
