import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
  AppDropdownDirective,
  HighlightDirective,
  SideNavToggleDirective,
  DropdownAnchorDirective,
  DropdownLinkDirective,
  FontSizeDirective,
  ScrollToDirective
} from './directives';
import {
  SidenavHelperDirective,
  SidenavTogglerDirective
} from './directives/sidenav-helper';
import {WINDOW_PROVIDERS} from './helpers';
import {ExcerptPipe, GetValueByKeyPipe, RelativeTimePipe} from './pipes';


const DIRECTIVES = [
  FontSizeDirective,
  ScrollToDirective,
  AppDropdownDirective,
  DropdownAnchorDirective,
  DropdownLinkDirective,
  SideNavToggleDirective,
  SidenavHelperDirective,
  SidenavTogglerDirective,
  HighlightDirective
];

const PIPES = [
  RelativeTimePipe,
  ExcerptPipe,
  GetValueByKeyPipe
];

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ...PIPES,
    ...DIRECTIVES,
  ],
  exports: [
    ...DIRECTIVES,
    ...PIPES
  ],
  providers: [WINDOW_PROVIDERS]
})
export class CookieCodeToolsModule {
}
