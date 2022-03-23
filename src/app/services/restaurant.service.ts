import { HttpClient } from "@angular/common/http";
import {Injectable, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {map, Observable} from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';

import { Restaurant } from '../models/restaurant.model';

@Injectable()
export class RestaurantService{
  restaurants: Restaurant[]
    constructor(
        private http: HttpClient,
        private router: Router,
        private snackBar: MatSnackBar
    ) {
      this.restaurants = [];
    }

    onCreateRestaurant(name: string, menuName: string) {
        this.http.post('http://localhost:3000/restaurants', {
            name,
            menuName
        }).subscribe(response => {
          this.openSnackBar(`Restaurant ${name} created`)
          this.router.navigate(['/'], {
            queryParamsHandling: 'preserve'
          });
        })
    }

    fetchRestaurants() {
      return this.http
        .get('http://localhost:3000/restaurants')
        .pipe(map(res => {
          const formatted: {
            id: number,
            name: string,
            menu?: {
              name: string,
              dishes: { name: string, price: number, icon: string }[]
            }
          }[] = []

          Object.entries(res).map(item => {
            item[1].name = item[0]
            formatted.push(item[1])
          })

          this.restaurants = formatted;
          return formatted;
        }))
    }

    getRestaurant(id: number) {
        return this.restaurants.find(e => e.id === id);
    }

    fetchRestaurant(id: number): Observable<Restaurant> {
      return this.http
        .get<Restaurant>(`http://localhost:3000/restaurants/${id}`)
    }

    updateMenuItem(
      restaurantId: number,
      restaurantName: string,
      menuName: string,
      dishes: { name: string, price: number, icon: string }[]
    ) {
        // const currentRestaurant = this.getRestaurant(restaurantId);
        // currentRestaurant!.menu!.dishes = dishes

        this.http.put(`http://localhost:3000/restaurants/${restaurantId}`, {
          restaurantName,
          name: menuName,
          dishes
        })
        .subscribe(response => {
          this.openSnackBar(`Menu updated`)
          this.router.navigate([`/restaurant/${restaurantId}`], {
            queryParamsHandling: 'preserve'
          });
        })
    }

    deleteRestaurant(restaurantId: number, name: string) {
      this.http.delete(`http://localhost:3000/restaurants/${restaurantId}`)
        .subscribe(response => {
          this.openSnackBar(`Restaurant ${name} deleted`)
          this.router.navigate(['/'], {
            queryParamsHandling: 'preserve'
          });
        })
    }

    openSnackBar(message: string, action: string = 'Close') {
      this.snackBar.open(message, action);
    }
}
