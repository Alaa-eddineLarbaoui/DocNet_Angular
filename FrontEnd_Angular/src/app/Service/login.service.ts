import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {JwtDto} from "../Models/JwtDto";
import {LoginRequest} from "../Models/LoginRequest";

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private http : HttpClient) { }

  API_LOGIN = "http://localhost:8090/api/auth/login";
  Login(login: LoginRequest): Observable<JwtDto> {
    return this.http.post<JwtDto>(this.API_LOGIN, login);
  }
}
