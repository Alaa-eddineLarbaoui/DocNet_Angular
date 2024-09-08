import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Appointment, Availability} from "../Models/File";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = 'http://localhost:8090/api/appointments';

  constructor(private http: HttpClient) {}

  // getAvailableTimes(date: string): Observable<string[]> {
  //   return this.http.get<string[]>(`${this.apiUrl}/available-times?date=${date}`);
  // }
  //
  // reserveTime(date: string, time: string, patientId: number): Observable<void> {
  //   const url = `${this.apiUrl}/reserve/${date}/${time}/${patientId}`;
  //   return this.http.post<void>(url, null);
  // }


}
