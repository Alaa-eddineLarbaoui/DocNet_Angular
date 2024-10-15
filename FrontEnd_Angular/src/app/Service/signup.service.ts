import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SignUpPatient} from "../Models/SignUpPatient";
import {SignUpDoctor} from "../Models/SignUpDoctor";

@Injectable({
  providedIn: 'root'
})
export class SignupService {


  API_SignUp  = 'http://localhost:8090/api/auth';

  constructor(private http: HttpClient) {
  }

  registerPatient(signUp:SignUpPatient): Observable<SignUpPatient[]> {
    console.log(signUp)
    return this.http.post<SignUpPatient[]>(`${this.API_SignUp}/signup`,signUp);
  }
  registerDoctor(signUp:SignUpDoctor): Observable<SignUpDoctor[]> {
     return this.http.post<SignUpDoctor[]>(`${this.API_SignUp}/signupdoctor`,signUp);
  }
}

