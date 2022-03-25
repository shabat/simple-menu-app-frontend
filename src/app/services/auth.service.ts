import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isAdmin: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.isAdmin = false;
        this.route.queryParams.subscribe((params: Params) => {
          this.isAdmin = params['isAdmin'] === 'true'
        })
    }

    toggleAdmin() {
        this.isAdmin = !this.isAdmin
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            isAdmin: this.isAdmin
          }
        })

    }
}
