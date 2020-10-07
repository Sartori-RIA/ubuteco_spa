import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BeerStyle} from '../models/beer-style';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeerStyleResolver implements Resolve<BeerStyle> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BeerStyle> | Promise<BeerStyle> | BeerStyle {
    return undefined;
  }

}
