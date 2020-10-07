import {Component, Input, OnInit} from '@angular/core';
import {NguCarouselConfig} from '@ngu/carousel';

@Component({
  selector: 'app-services-carousel',
  templateUrl: './services-carousel.component.html',
  styleUrls: ['./services-carousel.component.scss']
})
export class ServicesCarouselComponent {
  @Input('backgroundGray') backgroundGray: boolean;
  carouselOptions: NguCarouselConfig;
  services = [{
    icon: 'dashboard',
    text: `Lorem ipsum dolor sit amet conse ctetur adipi sicing elit. Doloribus numquam quis.`,
    title: 'Business Application'
  }, {
    icon: 'perm_data_setting',
    text: `Lorem ipsum dolor sit amet conse ctetur adipi sicing elit. Doloribus numquam quis.`,
    title: 'System Integration'
  }, {
    icon: 'storage',
    text: `Lorem ipsum dolor sit amet conse ctetur adipi sicing elit. Doloribus numquam quis.`,
    title: 'Database Administration'
  }, {
    icon: 'stay_primary_portrait',
    text: `Lorem ipsum dolor sit amet conse ctetur adipi sicing elit. Doloribus numquam quis.`,
    title: 'Custom Mobile Application'
  }, {
    icon: 'person',
    text: `Lorem ipsum dolor sit amet conse ctetur adipi sicing elit. Doloribus numquam quis.`,
    title: 'Management Application'
  }, {
    icon: 'timeline',
    text: `Lorem ipsum dolor sit amet conse ctetur adipi sicing elit. Doloribus numquam quis.`,
    title: 'Planning Application'
  }];

  ngOnInit() {
    this.carouselOptions = {
      grid: {xs: 1, sm: 2, md: 3, lg: 3, all: 0},
      slide: 2,
      speed: 400,
      interval: {timing: 4000},
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      loop: true
    };
  }

}
