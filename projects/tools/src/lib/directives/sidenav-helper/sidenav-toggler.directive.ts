import {Directive, HostListener, Input} from '@angular/core';
import {SidenavHelperService} from '../../services';

@Directive({
  selector: '[libSidenavToggler]'
})
export class SidenavTogglerDirective {
  @Input('sidenavToggler')
  public id: any;

  constructor(private egretSidenavHelperService: SidenavHelperService) {
  }

  @HostListener('click')
  onClick() {
    this.egretSidenavHelperService.getSidenav(this.id).toggle();
  }
}
