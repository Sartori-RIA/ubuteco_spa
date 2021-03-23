import {fab} from '@fortawesome/free-brands-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [FontAwesomeModule],
  exports: [FontAwesomeModule],
})
export class FontAwesomeIconsModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fab, fas, far);
  }
}
