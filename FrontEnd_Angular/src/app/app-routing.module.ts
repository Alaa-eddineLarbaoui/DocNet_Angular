import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AvailabilityCalendarComponent} from "./availability-calendar/availability-calendar.component";

const routes: Routes = [
  { path: 'availability-calendar', component: AvailabilityCalendarComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
