
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppointmentsComponent } from './appointments/appointments.component';
import { CommonModule, DatePipe } from '@angular/common';
import { CreateAvailabilityComponent } from './create-availability/create-availability.component';
import { AvailabilityCalendarComponent } from './availability-calendar/availability-calendar.component';
import { FilterComponent } from './filter/filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { MapDoctorComponent } from './map-doctor/map-doctor.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './Home_page/home.component';
import { FilterFormComponent } from './filter-form/filter-form.component';

// Import LottieModule
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { Page404Component } from './page-404/page-404.component';
import {MatCardModule} from "@angular/material/card"; // Import directement le player

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
    Page404Component
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
    MatCardModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
