import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { Restaurant } from '../../models/restaurant.model';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-menu-page.component.html',
  styleUrls: ['./edit-menu-page.component.scss']
})
export class EditMenuPageComponent implements OnInit, AfterViewInit {
  @ViewChild('form', { read: NgForm }) form: any;
  selectedIcons: string[] = [];
  menuItems: string[] = ['First','Second','Third'];
  restaurant?: Restaurant;

  constructor(
    private restaurantService: RestaurantService,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.restaurantService.fetchRestaurant(+this.route.snapshot.params['id']).subscribe((res) => {
      this.restaurant = res;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.form.setValue(
        {
          menuName: this.restaurant?.menu?.name,
          First: this.restaurant?.menu?.dishes[0],
          Second: this.restaurant?.menu?.dishes[1],
          Third: this.restaurant?.menu?.dishes[2]
        }
      )
    })
  }

  onSubmit() {
    const menuName = this.form.value.menuName;
    delete this.form.value.menuName;
    this.restaurantService.updateMenuItem(this.restaurant!.id, menuName,  Object.values(this.form.value))
  }

  iconsList: string[] = [
    'cake',
    'lunch_dining',
    'local_cafe',
    'fastfood',
    'local_dining',
    'ramen_dining',
    'local_pizza',
    'dinner_dining',
    'bakery_dining',
    'soup_kitchen'
  ];

}
