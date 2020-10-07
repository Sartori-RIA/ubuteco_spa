import {Attribute, Directive, ElementRef, OnInit} from '@angular/core';

@Directive({selector: '[libFontSize]'})
export class FontSizeDirective implements OnInit {
  constructor(@Attribute('fontSize') public fontSize: string,
              private el: ElementRef) {
  }

  ngOnInit() {
    this.el.nativeElement.fontSize = this.fontSize;
  }
}
