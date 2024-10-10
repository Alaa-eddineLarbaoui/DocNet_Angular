import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageNotificationService {

  private apiUrl = 'http://localhost:8090/notification/send';


  constructor(private http: HttpClient) { }

  /*sendNotification(patientId: number, healthProfessionalId: number, message: string): Observable<Notification> {
    return this.http.post<Notification>(`${this.apiUrl}/send`);

  }*/

}
