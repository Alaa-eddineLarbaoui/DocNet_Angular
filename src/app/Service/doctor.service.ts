import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {HealthProfessional} from "../Models/HealthProfessional";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private apiUrl = 'http://localhost:8090/api/health-professionals'; // Remplacez par l'URL correcte de votre API

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer tous les professionnels de santé
  getAllHealthProfessionals(): Observable<HealthProfessional[]> {
    return this.http.get<HealthProfessional[]>(`${this.apiUrl}/getAll`);
  }

}
