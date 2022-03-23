import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.route.snapshot.queryParams['isAdmin'] === 'true') {
      return true;
    } else {
      this.router.navigate(['/'], {
        queryParams: {
          isAdmin: false,
          error: true
        },
      });
      console.error('Only admins allowed.');
      return false;
    }
  }

}
