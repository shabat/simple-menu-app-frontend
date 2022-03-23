import {Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from "@angular/forms";
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-create-restaurant-page',
  templateUrl: './create-restaurant-page.component.html',
  styleUrls: ['./create-restaurant-page.component.scss']
})
export class CreateRestaurantPageComponent implements OnInit {
  @ViewChild('form', { read: NgForm }) form: any;
  constructor(
    private restaurantService: RestaurantService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.form.valid) {
      console.error('Form not valid')
    } else {
      this.restaurantService.onCreateRestaurant(this.form.value.name, this.form.value.menuName)
    }
  }

}
