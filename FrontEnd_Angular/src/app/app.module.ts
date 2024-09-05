import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppointmentsComponent } from './appointments/appointments.component';
import {CommonModule, DatePipe} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    AppointmentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],

  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
