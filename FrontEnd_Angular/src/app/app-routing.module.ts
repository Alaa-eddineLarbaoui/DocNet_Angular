import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AvailabilityCalendarComponent} from "./availability-calendar/availability-calendar.component";
import {FilterComponent} from "./filter/filter.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {LoginComponent} from "./login/login.component";
import {MapDoctorComponent} from "./map-doctor/map-doctor.component";
import {DoctorDetailsComponent} from "./doctor-details/doctor-details.component";

const routes: Routes = [

  { path: 'filter', component: FilterComponent },
  { path: 'calendar', component: AvailabilityCalendarComponent },
   { path: '', redirectTo: '/filter', pathMatch: 'full' },
  //{  path:'',component:LoginComponent},
  { path: 'notFound' , component:NotFoundComponent },


  {path:'calendar/doctor/:id' , component : DoctorDetailsComponent}

];

@NgModule({imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

