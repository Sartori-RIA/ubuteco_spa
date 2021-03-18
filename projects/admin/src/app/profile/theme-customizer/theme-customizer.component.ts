import {Component, OnInit} from '@angular/core';
import {CustomizerColors, ILayoutConf} from '../../core/models/theme';
import {LayoutService} from '../../core/services/theme/layout.service';
import {AppState} from '../../store';
import {select, Store} from '@ngrx/store';
import {selectFooterColors, selectSidebarColors, selectTopBarColors} from '../../store/theme/theme.selectors';
import {FOOTER_COLOR_CHANGED, SIDEBAR_COLOR_CHANGED, TOP_BAR_COLOR_CHANGED} from '../../store/theme/theme.actions';

@Component({
  selector: 'app-theme-customizer',
  templateUrl: './theme-customizer.component.html',
  styleUrls: ['./theme-customizer.component.scss']
})
export class ThemeCustomizerComponent {

  viewMode: 'options' | 'json' = 'options';
  layoutConf: ILayoutConf = this.layout.layoutConf;
  sidebarColors$ = this.store.pipe(select(selectSidebarColors));
  topBarColors$ = this.store.pipe(select(selectTopBarColors));
  footerColors$ = this.store.pipe(select(selectFooterColors));

  constructor(private layout: LayoutService,
              private store: Store<AppState>) {
  }

  updateSidebar(data: CustomizerColors) {
    this.store.dispatch(SIDEBAR_COLOR_CHANGED({data}));
  }

  updateTopBar(data: CustomizerColors) {
    this.store.dispatch(TOP_BAR_COLOR_CHANGED({data}));
  }

  updateFooter(data: CustomizerColors) {
    this.store.dispatch(FOOTER_COLOR_CHANGED({data}));
  }
}
