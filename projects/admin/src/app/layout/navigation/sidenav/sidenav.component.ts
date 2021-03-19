import {Component, Input} from '@angular/core';
import {IMenuItem} from '../../../core/services/theme/navigation.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html'
})
export class SidenavComponent {
  @Input() items: IMenuItem[] = [];
  @Input() hasIconMenu = false;
  @Input() iconMenuTitle = '';
}
