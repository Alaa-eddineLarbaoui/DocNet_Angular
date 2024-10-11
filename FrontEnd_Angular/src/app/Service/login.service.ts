import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {JwtDto} from "../Dto-Entity/JwtDto";
import {LoginRequest} from "../Models/LoginRequest";
import {provideRouter, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(
    private http : HttpClient,
    private router:Router
              )
  {}

  API_LOGIN = "http://localhost:8090/api/auth/login";
  Login(login: LoginRequest): Observable<JwtDto> {
    return this.http.post<JwtDto>(this.API_LOGIN, login);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('jwtData');
    return !!token; // Retourne true si le token existe (l'utilisateur est connecté)
  }

  logout() {
    console.log("louuuugout")
    localStorage.removeItem('jwtData');
    alert("You are lougout oof this page")
    this.router.navigate(['/']);
  }
}
