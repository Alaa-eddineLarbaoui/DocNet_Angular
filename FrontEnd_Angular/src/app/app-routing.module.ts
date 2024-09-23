import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AvailabilityCalendarComponent} from "./availability-calendar/availability-calendar.component";
import {FilterComponent} from "./filter/filter.component";

const routes: Routes = [
  { path: 'filter', component: FilterComponent },
  { path: 'calendar', component: AvailabilityCalendarComponent },
  { path: '', redirectTo: '/filter', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
