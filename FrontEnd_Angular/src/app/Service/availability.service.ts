// availability.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Availability} from "../Models/Availability";
import {AvailabilityDto} from "../Dto-Entity/AvailabilityDto";

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {
   apiUrl = 'http://localhost:8090/api/availabilities';

  constructor(private http: HttpClient  ) {
  }


  createAvailability(availability: Availability, professionalId: number): Observable<Availability> {

    return this.http.post<Availability>(`${this.apiUrl}/create/${professionalId}`, availability);
  }

  getTimes(date: string, professionalId: number ): Observable<AvailabilityDto[]> {
    return this.http.get<AvailabilityDto[]>(`${this.apiUrl}/available-times`, {
      params: {
        date: date,
        professionalId: professionalId.toString()
      }
    });
  }
  deleteAvailability(id:number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/delete/`+id)
  }


}
