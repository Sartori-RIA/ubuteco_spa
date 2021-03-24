import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {COUNTRIES_DB, Country} from '../../../core/models/country';
import {LocalStorage} from '../../util/storage';

@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.scss']
})
export class CountrySelectorComponent implements OnInit {

  countries: Country[] = COUNTRIES_DB;
  selectedCountry: Country = this.countries[0];

  constructor(private translateService: TranslateService,
              @Inject(PLATFORM_ID) private platformId: any) {
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const country: string = LocalStorage.country();
      const selected = this.countries.find((v) => v?.flag_name?.toLowerCase() === country?.toLowerCase());
      if (!!selected) {
        this.selectedCountry = selected;
      }
    }
  }

  onCountrySelected(country: Country) {
    if (isPlatformBrowser(this.platformId)) {
      this.translateService.use(country.flag_name.toLowerCase());
      LocalStorage.setCountry(country.flag_name.toLowerCase());
      this.selectedCountry = country;
    }
  }
}
