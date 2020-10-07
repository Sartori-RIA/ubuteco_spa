import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ReportsService} from '../../core/services/api/reports.service';
import {Observable} from 'rxjs';
import {Report} from '../../core/models/report';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  bestBreweryReport$: Observable<Report> = this.reportService.bestBreweriesByMonth();
  bestBeerStyleReport$: Observable<Report> = this.reportService.bestStyleByMonth();
  bestBeerReport$: Observable<Report> = this.reportService.bestBeerByMonth();

  constructor(private reportService: ReportsService) {
  }

  ngOnInit() {
  }

}
