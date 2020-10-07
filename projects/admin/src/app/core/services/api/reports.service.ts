import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Report} from '../../models/report';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) {
  }

  bestBeerByMonth(): Observable<Report> {
    return this.http.get<Report>(`${environment.api_url}best_beers_by_month`).pipe();
  }

  bestStyleByMonth(): Observable<Report> {
    return this.http.get<Report>(`${environment.api_url}best_beer_styles_by_month`).pipe();
  }

  bestBreweriesByMonth(): Observable<Report> {
    return this.http.get<Report>(`${environment.api_url}best_breweries_by_month`).pipe();
  }
}
