import { Component, OnInit } from '@angular/core';

import { RestaurantService } from 'src/app/services/restaurant.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [RestaurantService, AuthService]
})
export class AppComponent {
  title = 'Simple Menu App';

  constructor(
    private restaurantService: RestaurantService,
    public authService: AuthService,
  ) {
  }
}
