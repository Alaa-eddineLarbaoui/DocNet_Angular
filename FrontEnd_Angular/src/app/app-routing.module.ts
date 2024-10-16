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
import {SignupComponent} from "./signup/signup.component";
import {SignLoginComponent} from "./sign-login/sign-login.component";
import {SigndoctorComponent} from "./signdoctor/signdoctor.component";



const routes: Routes = [

  {  path: 'dashboard-doctor',
    component:DashboardDoctorComponent,
    canActivate: [AuthGuard],
    children:[
      { path: 'list-appointment', component: PatientListComponent },
      {  path:'creat', component:CreatShowAvailabilityComponent},

    ] },

  { path: 'patient', component: AppointmentsComponent, canActivate: [AuthGuard] },


  { path: 'sign-login', component: SignLoginComponent },
  { path: '', component: HomeComponent },

  { path:'sign' , component: SignupComponent},


  { path: 'patient/filter', component: FilterComponent },

  { path: 'calendar', component: AvailabilityCalendarComponent },

  { path: 'login', component: LoginComponent },
  { path: 'notFound', component: NotFoundComponent },
  {path:"signdoctor", component:SigndoctorComponent},

  {
    path: 'patient/detailDoctor/:id', component: DoctorDetailsComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: Erole.PATIENT }
  },

  {
    path: 'appointment/:id', component: AppointmentsComponent,

  },

  { path: 'dd', component:CreateAvailabilityComponent },

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

