import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerResolver implements Resolve<CustomerResolver> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CustomerResolver> | Promise<CustomerResolver> | CustomerResolver {
    return undefined;
  }

}
