import { Injectable } from '@angular/core';
import {LoginRequest} from "../Models/LoginRequest";
import {Observable} from "rxjs";
import {JwtDto} from "../Dto-Entity/JwtDto";

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor() { }

  API_SIGN = "http://localhost:8090/api/auth/signup";


/*  signUp(sign: LoginRequest): Observable<JwtDto> {
    return this.http.post<JwtDto>(this.API_LOGIN, login);
  }*/

}
