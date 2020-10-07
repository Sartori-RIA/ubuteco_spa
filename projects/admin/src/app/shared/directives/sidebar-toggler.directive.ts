import {Directive, HostListener, Input} from '@angular/core';
import {SidebarHelperService} from '../../core/services/theme/sidebar-helper.service';

@Directive({
  selector: '[appSidebarToggler]'
})
export class SidebarTogglerDirective {
  @Input('sidebarToggler')
  public id: any;

  constructor(private egretSidebarHelperService: SidebarHelperService) {
  }

  @HostListener('click')
  onClick() {
    this.egretSidebarHelperService.getSidebar(this.id).toggle();
  }
}
