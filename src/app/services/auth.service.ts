import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnInit {
    isAdmin: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.isAdmin = this.route.snapshot.queryParams['isAdmin'] === 'true' ? true : false
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params: Params) => {
          this.isAdmin = params['isAdmin'] === 'true' ? true : false
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
