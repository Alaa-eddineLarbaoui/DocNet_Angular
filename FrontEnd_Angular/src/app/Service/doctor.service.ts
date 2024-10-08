import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {HealthProfessional} from "../Models/HealthProfessional";
import {Speciality} from "../Enums/Speciality";
import {Localisation} from "../Enums/Localisation";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private apiUrl = 'http://localhost:8090/api/health-professionals';

  constructor(private http: HttpClient) { }

  getAllHealthProfessionals(): Observable<HealthProfessional[]> {
    return this.http.get<HealthProfessional[]>(`${this.apiUrl}/getAll`);
  }

  filtreOfdoctor(): Observable<HealthProfessional[]> {
    return this.http.get<HealthProfessional[]>(`${this.apiUrl}/filter`);
  }

  SearchDoctor(speciality: Speciality, clinicAddress: Localisation ): Observable<HealthProfessional[]> {
    let params = new HttpParams();
    if (speciality) params = params.set('speciality', speciality);
    if (clinicAddress) params = params.set('clinicAddress', clinicAddress);

    return  this.http.get<HealthProfessional[]>(this.apiUrl +'/filter', { params });
  }

  getHealthProfById(idProf:number):Observable<HealthProfessional>{
    return this.http.get<HealthProfessional>(`${this.apiUrl}/get/${idProf}`);
  }
  deleteHealthProf(id:number) :Observable<any>{
    return this.http.delete(`${this.apiUrl}delete/${id}`)
  }







}
