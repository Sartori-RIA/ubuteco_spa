import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Maker} from '../models/maker';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreweryResolver implements Resolve<Maker> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Maker> | Promise<Maker> | Maker {
    return undefined;
  }

}
