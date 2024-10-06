import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  apiUrl=''
  constructor( private http:HttpClient) { }

/*
  getAllpatients():Observable<Patient>
*/



}


/*

private apiUrl = 'http://localhost:8090/api/health-professionals';

constructor(private http: HttpClient) { }

getAllHealthProfessionals(): Observable<HealthProfessional[]> {
  return this.http.get<HealthProfessional[]>(`${this.apiUrl}/getAll`);
}
*/
