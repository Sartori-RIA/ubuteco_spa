import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {NguCarouselConfig} from '@ngu/carousel';
import {BottomSheetShareComponent} from '../../../shared/components/bottom-sheet-share/bottom-sheet-share.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet';


@Component({
  selector: 'app-portfolio-carousel',
  templateUrl: './portfolio-carousel.component.html',
  styleUrls: ['./portfolio-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioCarouselComponent implements OnInit, AfterViewInit {

  @Input('backgroundGray') backgroundGray: boolean;
  carouselOptions: NguCarouselConfig;
  portfolios = [{
    photo: 'assets/images/sq-10.jpg',
    text: `Adipisci quas repellat sed. Quasi quaerat aut nam possimus
    vitae dignissimos, sapiente est atque tenetur`,
    title: 'Project One',
  }, {
    photo: 'assets/images/sq-11.jpg',
    text: `Adipisci quas repellat sed. Quasi quaerat aut nam possimus
    vitae dignissimos, sapiente est atque tenetur`,
    title: 'Project Two',
  }, {
    photo: 'assets/images/sq-12.jpg',
    text: `Adipisci quas repellat sed. Quasi quaerat aut nam possimus
    vitae dignissimos, sapiente est atque tenetur`,
    title: 'Project Three',
  }, {
    photo: 'assets/images/sq-13.jpg',
    text: `Adipisci quas repellat sed. Quasi quaerat aut nam possimus
    vitae dignissimos, sapiente est atque tenetur`,
    title: 'Project Four',
  }, {
    photo: 'assets/images/sq-15.jpg',
    text: `Adipisci quas repellat sed. Quasi quaerat aut nam possimus
    vitae dignissimos, sapiente est atque tenetur`,
    title: 'Project Five',
  }, {
    photo: 'assets/images/sq-16.jpg',
    text: `Adipisci quas repellat sed. Quasi quaerat aut nam possimus
    vitae dignissimos, sapiente est atque tenetur`,
    title: 'Project Six',
  }];

  constructor(private bottomSheet: MatBottomSheet,
              private cdr: ChangeDetectorRef) {
  }

  openShareComponent(): void {
    this.bottomSheet.open(BottomSheetShareComponent);
  }

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

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

}
