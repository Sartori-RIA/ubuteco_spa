import {EventEmitter, Inject, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {ITheme} from '../../models/theme';


@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public onThemeChange: EventEmitter<ITheme> = new EventEmitter();

  public egretThemes: ITheme[] = [{
    name: 'egret-dark-purple',
    baseColor: '#9c27b0',
    isActive: false
  }, {
    name: 'egret-dark-pink',
    baseColor: '#e91e63',
    isActive: false
  }, {
    name: 'egret-blue',
    baseColor: '#03a9f4',
    isActive: true
  }, {
    name: 'egret-light-purple',
    baseColor: '#7367f0',
    isActive: false
  }, {
    name: 'egret-navy',
    baseColor: '#10174c',
    isActive: false
  }];
  public activatedTheme: ITheme;
  private renderer: Renderer2;

  constructor(@Inject(DOCUMENT) private document: Document,
              rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  // Invoked in AppComponent and apply 'activatedTheme' on startup
  applyMatTheme(themeName: string) {

    this.activatedTheme = this.egretThemes.find(t => t.name === themeName);
    this.flipActiveFlag(themeName);

    // this.changeTheme(themeName);
    this.renderer.addClass(this.document.body, themeName);

  }

  changeTheme(prevTheme, themeName: string) {
    this.renderer.removeClass(this.document.body, prevTheme);
    this.renderer.addClass(this.document.body, themeName);
    this.flipActiveFlag(themeName);
    this.onThemeChange.emit(this.activatedTheme);
  }

  flipActiveFlag(themeName: string) {
    this.egretThemes.forEach((t) => {
      t.isActive = false;
      if (t.name === themeName) {
        t.isActive = true;
        this.activatedTheme = t;
      }
    });
  }
}
