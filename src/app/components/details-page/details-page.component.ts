import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Restaurant } from '../../models/restaurant.model';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {
  restaurant?: Restaurant;
  constructor(
    private restaurantService: RestaurantService,
    public authService: AuthService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    // this.restaurant = this.restaurantService.getRestaurant(+this.route.snapshot.params['id']);
    this.restaurantService.fetchRestaurant(+this.route.snapshot.params['id']).subscribe((res) => {
      this.restaurant = res;
    });
  }

  onDeleteRestaurant() {
    this.restaurantService.deleteRestaurant(this.restaurant!.id, this.restaurant!.name);
  }

  onEditMenu(): void {
    // this.router.navigate(['edit'], { relativeTo: this.route, queryParamsHandling: 'preserve' })
  }

}
