import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailabilityCalendarComponent } from "./availability-calendar/availability-calendar.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./guards/auth.guard";
import { AppointmentsComponent } from "./appointments/appointments.component";
import { Erole } from "./Enums/Erole";
import {Page404Component} from "./page-404/page-404.component";
import {DashboardDoctorComponent} from "./Dashboard/Doctor-Dashboard/dashboard-doctor.component";
import {CreateAvailabilityComponent} from "./Doctor-component/create-availability/create-availability.component";
import {CreatShowAvailabilityComponent} from "./Doctor-component/creat-show-availability/creat-show-availability.component";
import {FilterComponent} from "./Home-component/filter/filter.component";
import {DoctorDetailsComponent} from "./Home-component/doctor-details/doctor-details.component";
import {HomeComponent} from "./Home-component/Home_page/home.component";
import {PatientListComponent} from "./Doctor-component/patient-list/patient-list.component";



const routes: Routes = [

  {  path: 'dashboard-doctor',
    component:DashboardDoctorComponent,
    children:[
      {  path:'', component:HomeComponent},
      {  path:'creat', component:CreatShowAvailabilityComponent},
    ] },

  { path: 'j', component: HomeComponent },
  { path: '', component: PatientListComponent },




  { path: 'patient/filter', component: FilterComponent ,
  canActivate:[AuthGuard],
    data:{expectedRole:Erole.PATIENT}
  },
  { path: 'calendar', component: AvailabilityCalendarComponent },

  //{ path: '', redirectTo: '/filter', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'notFound', component: NotFoundComponent },

  //{ path: 'admin', component: CalendarComponent, canActivate: [AuthGuard] },  // Accessible seulement pour Admin */
  { path: 'doctor', component: NotFoundComponent, canActivate: [AuthGuard] },
  { path: 'patient', component: AppointmentsComponent, canActivate: [AuthGuard] },

  {
    path: 'patient/detailDoctor/:id', component: DoctorDetailsComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: Erole.PATIENT }
  },

  {
    path: 'appointment/:id', component: AppointmentsComponent,

  },




  { path: 'dd', component:CreateAvailabilityComponent },


  // { path: 'creat-show-availability', component:CreatShowAvailabilityComponent },

  { path: '**', component:Page404Component },




];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled', // Cette option permet de restaurer la position de défilement
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

