import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from "../Models/Appointment";
import { PatientService } from "./patient.service";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = 'http://localhost:8090/api/appointments';

  constructor(private http: HttpClient) { }




  reserveAppointment(appointment: Appointment, patientId: number, doctorId: number): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.apiUrl}/add/${patientId}&${doctorId}`, appointment);
  }


  getAllbyDoctorId(doctorId: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/doctor/get/${doctorId}`)
  }
  getAllbyPatientId(patientId: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/doctor/get/${patientId}`)
  }



}
