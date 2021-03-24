import {NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {LocalStorage} from '../shared/util/storage';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {COUNTRIES_DB} from '../core/models/country';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: LocalStorage.country(),
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      }
    })
  ],
  exports: [TranslateModule],
})
export class NgxTranslateModule {

  constructor(private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer) {
    this.registerCountries();
  }

  registerCountries() {
    for (const country of COUNTRIES_DB) {
      const countryAlpha2Code = country.flag_name.toLowerCase();
      this.iconRegistry
        .addSvgIcon(countryAlpha2Code, this.sanitizer
          .bypassSecurityTrustResourceUrl(`assets/svg-country-flags/svg/${countryAlpha2Code}.svg`));
    }
  }
}
