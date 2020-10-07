import {BaseModel} from './base.model';

export interface Theme extends BaseModel {
  name: 'default' | 'custom' | 'egret-navy' | 'egret-light-purple' | 'egret-blue' | 'egret-dark-pink' | 'egret-dark-purple';
  color_header: Colors;
  color_footer: Colors;
  color_sidebar: Colors;
  rtl: boolean;
}

export interface ITheme {
  name: string;
  baseColor?: string;
  isActive?: boolean;
}

export interface ILayoutConf {
  navigationPos?: string; // side, top
  sidebarStyle?: string; // full, compact, closed
  sidebarCompactToggle?: boolean; // sidebar expandable on hover
  sidebarColor?: string; // Sidebar background color http://demos.ui-lib.com/egret-doc/#egret-colors
  dir?: string; // ltr, rtl
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

