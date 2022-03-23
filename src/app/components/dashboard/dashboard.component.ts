import { Component, OnInit} from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Restaurant } from '../../models/restaurant.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isAdmin: boolean;
  restaurants: Restaurant[] = [];

  constructor(
    private restaurantService: RestaurantService,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.isAdmin = this.authService.isAdmin
  }

  ngOnInit() {
    this.restaurantService.fetchRestaurants().subscribe((res) => {
      this.restaurants = res;
    });

    if (this.route.snapshot.queryParams['error']) {
      this.openSnackBar('Only admins can edit menus')
    }

    this.restaurants = this.restaurantService.restaurants;
  }

  onRestaurantAdd(): void {
    this.router.navigate(['/restaurant/add'], { queryParamsHandling: 'preserve' })
  }

  openSnackBar(message: string, action: string = 'Close') {
    this.snackBar.open(message, action);
  }
}
