import { Injectable } from '@angular/core';
import {SidebarComponent} from '../../../layout/navigation/sidebar/sidebar.component';

interface SidebarComponentList {
  [key: string]: SidebarComponent;
}
@Injectable({
  providedIn: 'root'
})
export class SidebarHelperService {
  sidebarList: SidebarComponentList = {};

  setSidebar(name: string, sidebar: SidebarComponent): void {
    this.sidebarList[name] = sidebar;
  }

  getSidebar(name: string): any {
    return this.sidebarList[name];
  }

  removeSidebar(name: string) {
    if (!this.sidebarList[name]) {
      console.warn(`The sidebar with name '${name}' doesn't exist.`);
    }

    // remove sidebar
    delete this.sidebarList[name];
  }
}
