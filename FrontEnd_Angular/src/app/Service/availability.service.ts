// availability.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Availability} from "../Models/Availability";

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {
  private apiUrl = 'http://localhost:8090/api/availabilities';

  constructor(private http: HttpClient , ) {
  }

  createAvailability(availability: Availability, professionalId: number): Observable<Availability> {
    return this.http.post<Availability>(`${this.apiUrl}/create/${professionalId}`, availability);
  }

  getAvailableTimes(date: string, professionalId: number ): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/available-times`, {
      params: {
        date: date,
        professionalId: professionalId.toString()
      }
    });
  }
}
