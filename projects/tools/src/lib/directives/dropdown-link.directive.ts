import {Directive, HostBinding, Inject, Input, OnDestroy, OnInit} from '@angular/core';

import {AppDropdownDirective} from './dropdown.directive';

@Directive({
  selector: '[libDropdownLink]'
})
export class DropdownLinkDirective implements OnInit, OnDestroy {

  @Input() public group: any;
  protected nav: AppDropdownDirective;

  public constructor(@Inject(AppDropdownDirective) nav: AppDropdownDirective) {
    this.nav = nav;
  }

  // tslint:disable-next-line:variable-name
  protected _open: boolean;

  @HostBinding('class.open')
  @Input()
  get open(): boolean {
    return this._open;
  }

  set open(value: boolean) {
    this._open = value;
    if (value) {
      this.nav.closeOtherLinks(this);
    }
  }

  public ngOnInit(): any {
    this.nav.addLink(this);
  }

  public ngOnDestroy(): any {
    this.nav.removeGroup(this);
  }

  public toggle(): any {
    this.open = !this.open;
  }

}
