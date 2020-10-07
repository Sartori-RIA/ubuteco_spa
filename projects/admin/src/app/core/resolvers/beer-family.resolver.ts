import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BeerFamily} from '../models/beer-family';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeerFamilyResolver implements Resolve<BeerFamily> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BeerFamily> | Promise<BeerFamily> | BeerFamily {
    return undefined;
  }

}
