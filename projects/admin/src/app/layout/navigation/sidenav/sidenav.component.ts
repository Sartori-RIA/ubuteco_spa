import {Component, Input} from '@angular/core';
import {IMenuItem} from '../../../core/services/theme/navigation.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.template.html'
})
export class SidenavComponent {
  @Input() public items: IMenuItem[] = [];
  @Input() public hasIconMenu: boolean;
  @Input() public iconMenuTitle: string;
}
