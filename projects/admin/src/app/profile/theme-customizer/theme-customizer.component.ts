import {Component, OnInit} from '@angular/core';
import {ITheme} from '../../core/models/theme';
import {NavigationService} from '../../core/services/theme/navigation.service';
import {LayoutService} from '../../core/services/theme/layout.service';
import {ThemeService} from '../../core/services/theme/theme.service';
import {CustomizerService} from '../../core/services/theme/customizer.service';

@Component({
  selector: 'app-theme-customizer',
  templateUrl: './theme-customizer.component.html',
  styleUrls: ['./theme-customizer.component.scss']
})
export class ThemeCustomizerComponent implements OnInit {

  viewMode: 'options' | 'json' = 'options';
  layoutConf;
  egretThemes: ITheme[];
  perfectScrollbarEnabled = true;

  constructor(private navService: NavigationService,
              public layout: LayoutService,
              private themeService: ThemeService,
              public customizer: CustomizerService) {
  }

  ngOnInit() {
    this.layoutConf = this.layout.layoutConf;
    this.egretThemes = this.themeService.egretThemes;
  }

  changeTheme(theme) {
    // this.themeService.changeTheme(theme);
    this.layout.publishLayoutChange({matTheme: theme.name});
  }

  changeSidenav(data) {
    this.navService.publishNavigationChange(data.value);
  }

  tooglePerfectScrollbar(data) {
    this.layout.publishLayoutChange({perfectScrollbar: this.perfectScrollbarEnabled});
  }


}
