import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Notificatiion} from "../Models/Notificatiion";

@Injectable({
  providedIn: 'root'
})
export class MessageNotificationService {

  private apiUrl = 'http://localhost:8090/notification/';


  constructor(private http: HttpClient) { }

  sendNotification(patientId: number, healthProfessionalId: number, message: string): Observable<any> {
    const params = new HttpParams()
      .set('patientId', patientId.toString())
      .set('healthProfessionalId', healthProfessionalId.toString())
      .set('message', message);

    return this.http.post<any>(`${this.apiUrl}send`, null, { params });
  }



}
