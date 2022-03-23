import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailsPageComponent } from './components/details-page/details-page.component';
import { EditMenuPageComponent } from './components/edit-menu-page/edit-menu-page.component';
import { CreateRestaurantPageComponent } from './components/create-restaurant-page/create-restaurant-page.component';
import { AuthGuard } from './auth-guard.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'restaurant/add', component: CreateRestaurantPageComponent, canActivate:[AuthGuard] },
  { path: 'restaurant/:id', component: DetailsPageComponent },
  { path: 'restaurant/:id/edit', component: EditMenuPageComponent, canActivate:[AuthGuard] },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
