
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppointmentsComponent } from './appointments/appointments.component';
import { CommonModule, DatePipe } from '@angular/common';
import { AvailabilityCalendarComponent } from './availability-calendar/availability-calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Import LottieModule
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { Page404Component } from './page-404/page-404.component';
import {MatCardModule} from "@angular/material/card";
import { DashboardDoctorComponent } from './Dashboard/Doctor-Dashboard/dashboard-doctor.component';
import { CreateAvailabilityComponent } from './Doctor-component/create-availability/create-availability.component';
import { PatientListComponent } from './Doctor-component/patient-list/patient-list.component';
import { CreatShowAvailabilityComponent } from './Doctor-component/creat-show-availability/creat-show-availability.component';
import { DoctorDetailsComponent } from './Home-component/doctor-details/doctor-details.component';
import { FilterComponent } from './Home-component/filter/filter.component';
import { MapDoctorComponent } from './Home-component/map-doctor/map-doctor.component';
import { HomeComponent } from './Home-component/Home_page/home.component';
import { FilterFormComponent } from './Home-component/filter-form/filter-form.component';
import { MapComponent } from './Home-component/map/map.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatTableModule} from "@angular/material/table";
import {MatChipsModule} from "@angular/material/chips";
import {MatLegacyChipsModule} from "@angular/material/legacy-chips";
import {MatPaginatorModule} from "@angular/material/paginator";

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    AppointmentsComponent,
    CreateAvailabilityComponent,
    AvailabilityCalendarComponent,
    FilterComponent,
    NotFoundComponent,
    LoginComponent,
    DoctorDetailsComponent,
    MapDoctorComponent,
    HomeComponent,
    FilterFormComponent,
    Page404Component,
    PatientListComponent,
    DashboardDoctorComponent,
    CreatShowAvailabilityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatTabsModule,
    MatSnackBarModule,
    LottieModule.forRoot({player: () => player}),
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatChipsModule,
    MatPaginatorModule

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
