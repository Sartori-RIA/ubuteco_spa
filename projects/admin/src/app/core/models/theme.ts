import {BaseModel} from './base.model';


export interface Theme extends BaseModel {
  name: 'default';
  color_header: Colors;
  color_footer: Colors;
  color_sidebar: Colors;
  rtl: boolean;
}

export const DEFAULT_THEME: Theme = {
  name: 'default',
  color_footer: 'dark-blue',
  color_header: 'white',
  color_sidebar: 'dark-blue',
  rtl: false
};


export const DEFAULT_COLORS: CustomizerColors[] = [
  {class: 'black', active: false},
  {class: 'white', active: false},
  {class: 'dark-blue', active: false},
  {class: 'grey', active: false},
  {class: 'brown', active: false},
  {class: 'gray', active: false},
  {class: 'purple', active: false},
  {class: 'blue', active: false},
  {class: 'indigo', active: false},
  {class: 'yellow', active: false},
  {class: 'green', active: false},
  {class: 'pink', active: false},
  {class: 'red', active: false},
  {class: 'slate', active: false}
];

export interface ILayoutConf {
  navigationPos?: string; // side, top
  sidebarStyle?: string; // full, compact, closed
  sidebarCompactToggle?: boolean; // sidebar expandable on hover
  sidebarColor?: string; // Sidebar background color http://demos.ui-lib.com/egret-doc/#egret-colors
  isMobile?: boolean; // updated automatically
  useBreadcrumb?: boolean; // Breadcrumb enabled/disabled
  breadcrumb?: string; // simple, title
  topbarFixed?: boolean; // Fixed header
  footerFixed?: boolean; // Fixed Footer
  topbarColor?: string; // Header background color http://demos.ui-lib.com/egret-doc/#egret-colors
  footerColor?: string; // Header background color http://demos.ui-lib.com/egret-doc/#egret-colors
  matTheme?: string; // material theme. egret-blue, egret-navy, egret-dark-purple, egret-dark-pink
  perfectScrollbar?: boolean;
}

export interface ILayoutChangeOptions {
  duration?: number;
  transitionClass?: boolean;
}

export interface IAdjustScreenOptions {
  browserEvent?: any;
  route?: string;
}

export type Colors =
  'black'
  | 'slate'
  | 'white'
  | 'dark-gray'
  | 'purple'
  | 'dark-blue'
  | 'indigo'
  | 'pink'
  | 'red'
  | 'grey'
  | 'brown'
  | 'yellow'
  | 'blue'
  | 'gray'
  | 'green';

export interface CustomizerColors {
  class: Colors;
  active: boolean;
}

