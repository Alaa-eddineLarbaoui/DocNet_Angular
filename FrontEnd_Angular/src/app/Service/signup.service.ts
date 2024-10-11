import { Injectable } from '@angular/core';
import {LoginRequest} from "../Models/LoginRequest";
import {Observable} from "rxjs";
import {JwtDto} from "../Dto-Entity/JwtDto";
import {HttpClient} from "@angular/common/http";
import {SignUpPatient} from "../Models/SignUpPatient";

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
}

